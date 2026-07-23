from fastapi import APIRouter

from app.api.routes import (
    auth,
    contact,
    consultation,
    public_content,
    admin_clients,
    admin_operations,
    admin_analytics,
    payment,
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(contact.router)
api_router.include_router(consultation.router)
api_router.include_router(public_content.router)
api_router.include_router(admin_clients.router)
api_router.include_router(admin_operations.router)
api_router.include_router(admin_analytics.router)
api_router.include_router(payment.router)