from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, EmailStr, ConfigDict
from app.models.billing import InvoiceStatus, PaymentStatus, AppointmentStatus


class InvoiceCreate(BaseModel):
    client_id: str
    invoice_number: str
    amount: Decimal
    currency: str = "INR"
    status: InvoiceStatus = InvoiceStatus.DRAFT
    due_date: datetime | None = None
    notes: str | None = None


class InvoiceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    client_id: str
    invoice_number: str
    amount: Decimal
    currency: str
    status: InvoiceStatus
    due_date: datetime | None
    created_at: datetime


class PaymentCreate(BaseModel):
    invoice_id: str
    amount: Decimal
    method: str | None = None
    status: PaymentStatus = PaymentStatus.PENDING
    transaction_ref: str | None = None


class PaymentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    invoice_id: str
    amount: Decimal
    method: str | None
    status: PaymentStatus
    transaction_ref: str | None
    created_at: datetime


class AppointmentCreate(BaseModel):
    client_id: str | None = None
    name: str
    email: EmailStr
    phone: str
    scheduled_at: datetime
    purpose: str | None = None
    status: AppointmentStatus = AppointmentStatus.SCHEDULED


class AppointmentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    phone: str
    scheduled_at: datetime
    purpose: str | None
    status: AppointmentStatus


class TestimonialCreate(BaseModel):
    client_name: str
    client_role: str | None = None
    quote: str
    rating: int = 5


class TestimonialOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    client_name: str
    client_role: str | None
    quote: str
    rating: int
    is_published: bool
