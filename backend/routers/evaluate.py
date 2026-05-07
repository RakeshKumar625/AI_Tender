from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter()

@router.post("/{bidder_id}", response_model=schemas.BidderOut)
async def evaluate_bidder(bidder_id: int, db: Session = Depends(get_db)):
    bidder = db.query(models.Bidder).filter(models.Bidder.id == bidder_id).first()
    if not bidder:
        raise HTTPException(status_code=404, detail="Bidder not found")
        
    criteria = db.query(models.Criteria).filter(models.Criteria.tender_id == bidder.tender_id).all()
    evidence_list = db.query(models.Evidence).filter(models.Evidence.bidder_id == bidder_id).all()
    
    evidence_dict = {e.criteria_id: e for e in evidence_list}
    
    # Clear existing
    db.query(models.Evaluation).filter(models.Evaluation.bidder_id == bidder_id).delete()
    
    overall_status = "Eligible"
    needs_review = False
    
    for c in criteria:
        ev = evidence_dict.get(c.id)
        status = "FAIL"
        reasoning = "No evidence found."
        
        if ev:
            if ev.confidence_score < 0.6:
                status = "REVIEW"
                reasoning = f"Low confidence extraction ({ev.confidence_score*100:.1f}%). Needs manual check."
                needs_review = True
            else:
                try:
                    # Evaluate logic
                    if c.type in ["financial", "experience"]:
                        req_val = float(c.value)
                        ext_val = float(ev.extracted_value)
                        
                        if c.condition == ">=" and ext_val >= req_val:
                            status = "PASS"
                            reasoning = f"Extracted {ext_val} meets requirement >= {req_val}"
                        else:
                            status = "FAIL"
                            reasoning = f"Extracted {ext_val} does NOT meet requirement >= {req_val}"
                    else:
                        if ev.extracted_value.lower() == c.value.lower():
                            status = "PASS"
                            reasoning = f"Found required certification/compliance."
                        else:
                            status = "FAIL"
                            reasoning = f"Missing required certification/compliance."
                except Exception as e:
                    status = "REVIEW"
                    reasoning = f"Error comparing values: {str(e)}"
                    needs_review = True
                    
        evaluation = models.Evaluation(
            bidder_id=bidder_id,
            criteria_id=c.id,
            evidence_id=ev.id if ev else None,
            status=status,
            reasoning=reasoning
        )
        db.add(evaluation)
        
        if status == "FAIL" and c.is_mandatory:
            overall_status = "Not Eligible"

    if needs_review:
        overall_status = "Needs Manual Review"
        rc = models.ReviewCase(bidder_id=bidder_id, reason="Low confidence or parse error in evaluation.")
        db.add(rc)

    bidder.status = overall_status
    db.commit()
    
    log = models.AuditLog(action="Evaluation", user="System", details=f"Evaluated bidder {bidder_id}, result: {overall_status}")
    db.add(log)
    db.commit()

    db.refresh(bidder)
    return bidder
