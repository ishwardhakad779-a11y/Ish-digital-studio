import enum
from sqlalchemy import Column, String, Text, Enum, ForeignKey, ARRAY
from sqlalchemy.orm import relationship

from app.database.session import Base
from app.models.mixins import TimestampMixin, uuid_pk_column


class ProjectStatus(str, enum.Enum):
    DISCOVERY = "discovery"
    IN_PROGRESS = "in_progress"
    REVIEW = "review"
    COMPLETED = "completed"
    ON_HOLD = "on_hold"


class Project(Base, TimestampMixin):
    """Internal record of client projects (not necessarily shown publicly)."""
    __tablename__ = "projects"

    id = uuid_pk_column()
    client_id = Column(String, ForeignKey("clients.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.DISCOVERY, nullable=False)
    tech_stack = Column(ARRAY(String), default=list)
    budget = Column(String(50), nullable=True)

    client = relationship("Client", back_populates="projects")


class PortfolioItem(Base, TimestampMixin):
    """Public-facing portfolio entries shown on the website."""
    __tablename__ = "portfolio_items"

    id = uuid_pk_column()
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=False)
    tech_stack = Column(ARRAY(String), default=list)
    live_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    is_published = Column(String(10), default="true")  # simple flag, kept as string for portability
