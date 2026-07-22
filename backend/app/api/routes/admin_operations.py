from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.inquiry import ContactMessage, ConsultationRequest, MessageStatus
from app.models.billing import Invoice, Payment, Appointment
from app.schemas.inquiry import ContactMessageOut, ConsultationRequestOut
from app.schemas.billing import InvoiceCreate, InvoiceOut, PaymentCreate, PaymentOut, AppointmentCreate, AppointmentOut
from app.utils.deps import get_current_user

router = APIRouter(prefix="/admin", tags=["Admin - Operations"], dependencies=[Depends(get_current_user)])


# ---- Messages & Consultations ----

@router.get("/messages", response_model=list[ContactMessageOut])
def list_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.patch("/messages/{message_id}/status", response_model=ContactMessageOut)
def update_message_status(message_id: str, status: MessageStatus, db: Session = Depends(get_db)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.status = status
    db.commit()
    db.refresh(msg)
    return msg


@router.get("/consultations", response_model=list[ConsultationRequestOut])
def list_consultations(db: Session = Depends(get_db)):
    return db.query(ConsultationRequest).order_by(ConsultationRequest.created_at.desc()).all()


# ---- Appointments ----

@router.get("/appointments", response_model=list[AppointmentOut])
def list_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).order_by(Appointment.scheduled_at.asc()).all()


@router.post("/appointments", response_model=AppointmentOut, status_code=201)
def create_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    appt = Appointment(**payload.model_dump())
    db.add(appt)
    db.commit()
    db.refresh(appt)
    return appt


# ---- Invoices ----

@router.get("/invoices", response_model=list[InvoiceOut])
def list_invoices(db: Session = Depends(get_db)):
    return db.query(Invoice).order_by(Invoice.created_at.desc()).all()


@router.post("/invoices", response_model=InvoiceOut, status_code=201)
def create_invoice(payload: InvoiceCreate, db: Session = Depends(get_db)):
    invoice = Invoice(**payload.model_dump())
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return invoice


# ---- Payments ----

@router.get("/payments", response_model=list[PaymentOut])
def list_payments(db: Session = Depends(get_db)):
    return db.query(Payment).order_by(Payment.created_at.desc()).all()


@router.post("/payments", response_model=PaymentOut, status_code=201)
def create_payment(payload: PaymentCreate, db: Session = Depends(get_db)):
    payment = Payment(**payload.model_dump())
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment
