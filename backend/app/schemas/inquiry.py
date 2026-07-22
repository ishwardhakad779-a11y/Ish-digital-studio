from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from app.models.inquiry import MessageStatus


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    message: str = Field(min_length=5, max_length=2000)


class ContactMessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    phone: str
    message: str
    status: MessageStatus
    created_at: datetime


class ConsultationRequestCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    business_name: str | None = Field(default=None, max_length=200)
    service_interested: str | None = Field(default=None, max_length=150)
    preferred_date: str | None = None
    notes: str | None = Field(default=None, max_length=2000)


class ConsultationRequestOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    phone: str
    business_name: str | None
    service_interested: str | None
    preferred_date: str | None
    notes: str | None
    status: MessageStatus
    created_at: datetime
