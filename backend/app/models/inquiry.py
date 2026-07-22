import enum
from sqlalchemy import Column, String, Text, Enum, Boolean

from app.database.session import Base
from app.models.mixins import TimestampMixin, uuid_pk_column


class MessageStatus(str, enum.Enum):
    NEW = "new"
    READ = "read"
    REPLIED = "replied"
    ARCHIVED = "archived"


class ContactMessage(Base, TimestampMixin):
    """Submissions from the public Contact form."""
    __tablename__ = "contact_messages"

    id = uuid_pk_column()
    name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False, index=True)
    phone = Column(String(30), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(Enum(MessageStatus), default=MessageStatus.NEW, nullable=False)
    email_sent = Column(Boolean, default=False, nullable=False)


class ConsultationRequest(Base, TimestampMixin):
    """Submissions from the 'Book Free Consultation' flow."""
    __tablename__ = "consultation_requests"

    id = uuid_pk_column()
    name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False, index=True)
    phone = Column(String(30), nullable=False)
    business_name = Column(String(200), nullable=True)
    service_interested = Column(String(150), nullable=True)
    preferred_date = Column(String(50), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(Enum(MessageStatus), default=MessageStatus.NEW, nullable=False)
    email_sent = Column(Boolean, default=False, nullable=False)
