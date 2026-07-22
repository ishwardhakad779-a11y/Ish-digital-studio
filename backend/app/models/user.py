import enum
from sqlalchemy import Column, String, Boolean, Enum
from sqlalchemy.orm import relationship

from app.database.session import Base
from app.models.mixins import TimestampMixin, uuid_pk_column


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    STAFF = "staff"


class User(Base, TimestampMixin):
    """Internal users who can log into the admin dashboard."""
    __tablename__ = "users"

    id = uuid_pk_column()
    full_name = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.ADMIN, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)


class Client(Base, TimestampMixin):
    """Business clients ISH Digital Studio works with (not login accounts)."""
    __tablename__ = "clients"

    id = uuid_pk_column()
    business_name = Column(String(200), nullable=False)
    contact_name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=True, index=True)
    phone = Column(String(30), nullable=True)
    industry = Column(String(100), nullable=True)
    notes = Column(String(1000), nullable=True)

    projects = relationship("Project", back_populates="client", cascade="all, delete-orphan")
    invoices = relationship("Invoice", back_populates="client", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="client", cascade="all, delete-orphan")
