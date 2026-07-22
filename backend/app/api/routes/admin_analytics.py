from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.inquiry import ContactMessage, ConsultationRequest
from app.models.user import Client
from app.models.project import Project
from app.models.billing import Invoice, Payment, Appointment, InvoiceStatus, PaymentStatus
from app.utils.deps import get_current_user

router = APIRouter(prefix="/admin/analytics", tags=["Admin - Analytics"], dependencies=[Depends(get_current_user)])


@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    total_clients = db.query(func.count(Client.id)).scalar()
    total_projects = db.query(func.count(Project.id)).scalar()
    total_messages = db.query(func.count(ContactMessage.id)).scalar()
    total_consultations = db.query(func.count(ConsultationRequest.id)).scalar()
    upcoming_appointments = db.query(func.count(Appointment.id)).scalar()

    total_revenue = (
        db.query(func.coalesce(func.sum(Payment.amount), 0))
        .filter(Payment.status == PaymentStatus.SUCCESS)
        .scalar()
    )
    pending_invoices = (
        db.query(func.count(Invoice.id))
        .filter(Invoice.status.in_([InvoiceStatus.SENT, InvoiceStatus.OVERDUE]))
        .scalar()
    )

    return {
        "total_clients": total_clients,
        "total_projects": total_projects,
        "total_messages": total_messages,
        "total_consultations": total_consultations,
        "upcoming_appointments": upcoming_appointments,
        "total_revenue": float(total_revenue or 0),
        "pending_invoices": pending_invoices,
    }
