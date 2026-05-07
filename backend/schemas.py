from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: str
    company_name: Optional[str] = None
    gst_number: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None

class UserLogin(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    role: str
    company_name: Optional[str] = None
    gst_number: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    created_at: datetime
    
    class Config:
        orm_mode = True

class CriteriaBase(BaseModel):
    name: str
    type: str
    condition: str
    value: str
    is_mandatory: bool = True

class CriteriaOut(CriteriaBase):
    id: int
    tender_id: int
    class Config:
        orm_mode = True

class TenderBase(BaseModel):
    title: str
    description: str

class TenderOut(TenderBase):
    id: int
    created_at: datetime
    criteria: List[CriteriaOut] = []
    class Config:
        orm_mode = True

class DocumentOut(BaseModel):
    id: int
    file_path: str
    doc_type: str
    class Config:
        orm_mode = True

class EvidenceOut(BaseModel):
    id: int
    extracted_value: str
    page_number: int
    confidence_score: float
    source_doc_id: int
    class Config:
        orm_mode = True

class EvaluationOut(BaseModel):
    id: int
    criteria_id: int
    status: str
    reasoning: str
    evidence_id: Optional[int] = None
    class Config:
        orm_mode = True

class BidderBase(BaseModel):
    name: str
    tender_id: int

class BidderOut(BidderBase):
    id: int
    status: str
    created_at: datetime
    evaluations: List[EvaluationOut] = []
    documents: List[DocumentOut] = []
    class Config:
        orm_mode = True

class ReviewCaseOut(BaseModel):
    id: int
    bidder_id: int
    reason: str
    status: str
    class Config:
        orm_mode = True

class AuditLogOut(BaseModel):
    id: int
    action: str
    timestamp: datetime
    user: str
    details: str
    class Config:
        orm_mode = True
