from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.inquiry import ContactMessage
from app.schemas.inquiry import ContactMessageCreate, ContactMessageOut
from app.services.email_service import send_contact_confirmation, send_admin_notification

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("", response_model=ContactMessageOut, status_code=201)
def submit_contact_message(
    payload: ContactMessageCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    entry = ContactMessage(**payload.model_dump())
    db.add(entry)
    db.commit()
    db.refresh(entry)

    # Fire emails in the background so the client gets an instant response.
    background_tasks.add_task(send_contact_confirmation, entry.name, entry.email)
    background_tasks.add_task(
        send_admin_notification, "New Contact Message", entry.name, entry.email, entry.phone, entry.message
    )

    return entry
