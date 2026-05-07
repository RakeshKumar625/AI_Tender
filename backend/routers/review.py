from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models
import schemas

router = APIRouter()

@router.get("/cases/", response_model=List[schemas.ReviewCaseOut])
def get_review_cases(db: Session = Depends(get_db)):
    return db.query(models.ReviewCase).filter(models.ReviewCase.status == "Open").all()

@router.post("/resolve/{case_id}")
def resolve_case(
    case_id: int, 
    action: str = Body(...), # "APPROVE", "REJECT", "UPDATE"
    notes: str = Body(""),
    new_value: str = Body(None),
    criteria_id: int = Body(None),
    db: Session = Depends(get_db)
):
    case = db.query(models.ReviewCase).filter(models.ReviewCase.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    bidder = db.query(models.Bidder).filter(models.Bidder.id == case.bidder_id).first()

    if action == "UPDATE" and new_value and criteria_id:
        ev = db.query(models.Evidence).filter(models.Evidence.bidder_id == case.bidder_id, models.Evidence.criteria_id == criteria_id).first()
        if ev:
            ev.extracted_value = new_value
            ev.confidence_score = 1.0 # Human verified
            db.commit()
            
        # Also need to re-evaluate or just update evaluation status
        eval_record = db.query(models.Evaluation).filter(models.Evaluation.bidder_id == case.bidder_id, models.Evaluation.criteria_id == criteria_id).first()
        if eval_record:
            eval_record.status = "PASS" # assuming update means fix
            eval_record.reasoning = f"Manually updated to {new_value}. {notes}"
            db.commit()

    if action in ["APPROVE", "REJECT"]:
        bidder.status = "Eligible" if action == "APPROVE" else "Not Eligible"
        case.status = "Resolved"
        db.commit()

    log = models.AuditLog(action=f"Manual Review: {action}", user="Officer", details=f"Case {case_id} resolved for Bidder {bidder.id}. Notes: {notes}")
    db.add(log)
    db.commit()
    
    return {"message": "Case resolved"}
