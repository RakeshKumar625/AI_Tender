from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String) # 'admin' or 'bidder'
    
    # Bidder specific fields
    company_name = Column(String, nullable=True)
    gst_number = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class Tender(Base):
    __tablename__ = "tenders"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    criteria = relationship("Criteria", back_populates="tender")
    bidders = relationship("Bidder", back_populates="tender")

class Criteria(Base):
    __tablename__ = "criteria"
    id = Column(Integer, primary_key=True, index=True)
    tender_id = Column(Integer, ForeignKey("tenders.id"))
    name = Column(String)
    type = Column(String) # turnover, projects, certification
    condition = Column(String) # >=, ==
    value = Column(String)
    is_mandatory = Column(Boolean, default=True)
    
    tender = relationship("Tender", back_populates="criteria")
    evaluations = relationship("Evaluation", back_populates="criteria")

class Bidder(Base):
    __tablename__ = "bidders"
    id = Column(Integer, primary_key=True, index=True)
    tender_id = Column(Integer, ForeignKey("tenders.id"))
    name = Column(String, index=True)
    status = Column(String, default="Pending") # Eligible, Not Eligible, Needs Manual Review
    created_at = Column(DateTime, default=datetime.utcnow)
    
    tender = relationship("Tender", back_populates="bidders")
    documents = relationship("Document", back_populates="bidder")
    evaluations = relationship("Evaluation", back_populates="bidder")

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    bidder_id = Column(Integer, ForeignKey("bidders.id"))
    file_path = Column(String)
    doc_type = Column(String)
    
    bidder = relationship("Bidder", back_populates="documents")

class Evidence(Base):
    __tablename__ = "evidence"
    id = Column(Integer, primary_key=True, index=True)
    bidder_id = Column(Integer, ForeignKey("bidders.id"))
    criteria_id = Column(Integer, ForeignKey("criteria.id"))
    extracted_value = Column(String)
    source_doc_id = Column(Integer, ForeignKey("documents.id"))
    page_number = Column(Integer)
    confidence_score = Column(Float)

class Evaluation(Base):
    __tablename__ = "evaluations"
    id = Column(Integer, primary_key=True, index=True)
    bidder_id = Column(Integer, ForeignKey("bidders.id"))
    criteria_id = Column(Integer, ForeignKey("criteria.id"))
    evidence_id = Column(Integer, ForeignKey("evidence.id"), nullable=True)
    status = Column(String) # PASS, FAIL, REVIEW
    reasoning = Column(Text)
    
    bidder = relationship("Bidder", back_populates="evaluations")
    criteria = relationship("Criteria", back_populates="evaluations")

class ReviewCase(Base):
    __tablename__ = "review_cases"
    id = Column(Integer, primary_key=True, index=True)
    bidder_id = Column(Integer, ForeignKey("bidders.id"))
    reason = Column(Text)
    status = Column(String, default="Open") # Open, Resolved
    assigned_to = Column(String, nullable=True)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    action = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user = Column(String)
    details = Column(Text)
