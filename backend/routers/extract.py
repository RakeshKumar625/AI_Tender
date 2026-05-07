from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
import random

router = APIRouter()

@router.post("/tender/{tender_id}", response_model=list[schemas.CriteriaOut])
async def extract_tender_criteria(tender_id: int, db: Session = Depends(get_db)):
    tender = db.query(models.Tender).filter(models.Tender.id == tender_id).first()
    if not tender:
        raise HTTPException(status_code=404, detail="Tender not found")
        
    # In a real scenario, we'd read the file from upload dir, pass to pdfplumber, run spacy, etc.
    # MVP: Generate simulated criteria
    
    # Clear existing
    db.query(models.Criteria).filter(models.Criteria.tender_id == tender_id).delete()
    
    criteria_list = [
        models.Criteria(tender_id=tender_id, name="Minimum Turnover", type="financial", condition=">=", value="50000000", is_mandatory=True),
        models.Criteria(tender_id=tender_id, name="Past Projects", type="experience", condition=">=", value="3", is_mandatory=True),
        models.Criteria(tender_id=tender_id, name="ISO Certification", type="certification", condition="==", value="True", is_mandatory=False),
        models.Criteria(tender_id=tender_id, name="GST Registration", type="compliance", condition="==", value="True", is_mandatory=True),
    ]
    
    for c in criteria_list:
        db.add(c)
    db.commit()
    
    # Audit log
    log = models.AuditLog(action="Tender Extraction", user="System", details=f"Extracted {len(criteria_list)} criteria for tender {tender_id}")
    db.add(log)
    db.commit()

    return db.query(models.Criteria).filter(models.Criteria.tender_id == tender_id).all()

@router.post("/bidder/{bidder_id}", response_model=list[schemas.EvidenceOut])
async def extract_bidder_evidence(bidder_id: int, db: Session = Depends(get_db)):
    bidder = db.query(models.Bidder).filter(models.Bidder.id == bidder_id).first()
    if not bidder:
        raise HTTPException(status_code=404, detail="Bidder not found")
        
    # Clear existing
    db.query(models.Evidence).filter(models.Evidence.bidder_id == bidder_id).delete()
    
    docs = bidder.documents
    if not docs:
        raise HTTPException(status_code=400, detail="No documents found for bidder")
        
    criteria = db.query(models.Criteria).filter(models.Criteria.tender_id == bidder.tender_id).all()
    
    evidence_list = []
    # Mocking PaddleOCR and NLP
    for c in criteria:
        # Generate some mock variations based on bidder name to show PASS/FAIL
        if "fail" in bidder.name.lower() and c.type == "financial":
            extracted = "40000000"  # Below 5Cr
            confidence = 0.95
        elif "review" in bidder.name.lower() and c.type == "experience":
            extracted = "2"
            confidence = 0.45 # Trigger review
        else:
            if c.type == "financial": extracted = "65000000"
            elif c.type == "experience": extracted = "5"
            else: extracted = "True"
            confidence = random.uniform(0.85, 0.99)
            
        ev = models.Evidence(
            bidder_id=bidder_id,
            criteria_id=c.id,
            extracted_value=extracted,
            source_doc_id=docs[0].id,
            page_number=random.randint(1, 10),
            confidence_score=confidence
        )
        db.add(ev)
        evidence_list.append(ev)
        
    db.commit()
    
    log = models.AuditLog(action="Bidder Extraction", user="System", details=f"Extracted evidence for bidder {bidder_id}")
    db.add(log)
    db.commit()

    return db.query(models.Evidence).filter(models.Evidence.bidder_id == bidder_id).all()
