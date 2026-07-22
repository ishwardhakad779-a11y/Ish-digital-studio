import enum
from sqlalchemy import Column, String, Text, Numeric, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from app.database.session import Base
from app.models.mixins import TimestampMixin, uuid_pk_column


class InvoiceStatus(str, enum.Enum):
    DRAFT = "draft"
    SENT = "sent"
    PAID = "paid"
    OVERDUE = "overdue"
    CANCELLED = "cancelled"


class Invoice(Base, TimestampMixin):
    __tablename__ = "invoices"

    id = uuid_pk_column()
    client_id = Column(String, ForeignKey("clients.id", ondelete="CASCADE"), nullable=False)
    invoice_number = Column(String(50), unique=True, nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(10), default="INR")
    status = Column(Enum(InvoiceStatus), default=InvoiceStatus.DRAFT, nullable=False)
    due_date = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)

    client = relationship("Client", back_populates="invoices")
    payments = relationship("Payment", back_populates="invoice", cascade="all, delete-orphan")


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    REFUNDED = "refunded"


class Payment(Base, TimestampMixin):
    __tablename__ = "payments"

    id = uuid_pk_column()
    invoice_id = Column(String, ForeignKey("invoices.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    method = Column(String(50), nullable=True)  # e.g. upi, card, bank_transfer
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False)
    transaction_ref = Column(String(150), nullable=True)

    invoice = relationship("Invoice", back_populates="payments")


class AppointmentStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"


class Appointment(Base, TimestampMixin):
    __tablename__ = "appointments"

    id = uuid_pk_column()
    client_id = Column(String, ForeignKey("clients.id", ondelete="CASCADE"), nullable=True)
    name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=False)
    scheduled_at = Column(DateTime, nullable=False)
    purpose = Column(String(200), nullable=True)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED, nullable=False)

    client = relationship("Client", back_populates="appointments")
