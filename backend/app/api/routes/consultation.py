from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.inquiry import ConsultationRequest
from app.schemas.inquiry import ConsultationRequestCreate, ConsultationRequestOut
from app.services.email_service import send_contact_confirmation, send_admin_notification

router = APIRouter(prefix="/consultation", tags=["Consultation"])


@router.post("", response_model=ConsultationRequestOut, status_code=201)
def submit_consultation_request(
    payload: ConsultationRequestCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    entry = ConsultationRequest(**payload.model_dump())
    db.add(entry)
    db.commit()
    db.refresh(entry)

    background_tasks.add_task(send_contact_confirmation, entry.name, entry.email)
    background_tasks.add_task(
        send_admin_notification,
        "New Consultation Request",
        entry.name,
        entry.email,
        entry.phone,
        entry.notes or entry.service_interested or "No additional notes",
    )

    return entry
