from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models
import schemas

router = APIRouter()

@router.get("/dashboard/")
def get_dashboard_stats(db: Session = Depends(get_db)):
    tenders = db.query(models.Tender).count()
    bidders = db.query(models.Bidder).count()
    eligible = db.query(models.Bidder).filter(models.Bidder.status == "Eligible").count()
    not_eligible = db.query(models.Bidder).filter(models.Bidder.status == "Not Eligible").count()
    review = db.query(models.ReviewCase).filter(models.ReviewCase.status == "Open").count()
    
    return {
        "total_tenders": tenders,
        "total_bidders": bidders,
        "eligible": eligible,
        "not_eligible": not_eligible,
        "needs_review": review
    }
