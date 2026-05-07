from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models
import schemas
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/tender/", response_model=schemas.TenderOut)
async def upload_tender(
    title: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save the tender record
    tender = models.Tender(title=title, description=description)
    db.add(tender)
    db.commit()
    db.refresh(tender)

    # Save the file
    file_location = f"{UPLOAD_DIR}/tender_{tender.id}_{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # In a real app, trigger extraction here asynchronously
    
    return tender

@router.post("/bidder/", response_model=schemas.BidderOut)
async def upload_bidder_docs(
    name: str = Form(...),
    tender_id: int = Form(...),
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    tender = db.query(models.Tender).filter(models.Tender.id == tender_id).first()
    if not tender:
        raise HTTPException(status_code=404, detail="Tender not found")

    bidder = models.Bidder(name=name, tender_id=tender_id)
    db.add(bidder)
    db.commit()
    db.refresh(bidder)

    for file in files:
        file_location = f"{UPLOAD_DIR}/bidder_{bidder.id}_{file.filename}"
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
        
        doc = models.Document(bidder_id=bidder.id, file_path=file_location, doc_type="evidence")
        db.add(doc)

    db.commit()
    db.refresh(bidder)
    
    # Trigger bidder extraction pipeline asynchronously here

    return bidder

@router.get("/tenders/", response_model=List[schemas.TenderOut])
def get_tenders(db: Session = Depends(get_db)):
    return db.query(models.Tender).all()

@router.get("/bidders/", response_model=List[schemas.BidderOut])
def get_bidders(db: Session = Depends(get_db)):
    return db.query(models.Bidder).all()
