from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict
from app.models.project import ProjectStatus


class ClientCreate(BaseModel):
    business_name: str
    contact_name: str
    email: EmailStr | None = None
    phone: str | None = None
    industry: str | None = None
    notes: str | None = None


class ClientOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    business_name: str
    contact_name: str
    email: EmailStr | None
    phone: str | None
    industry: str | None
    created_at: datetime


class ProjectCreate(BaseModel):
    client_id: str
    title: str
    description: str | None = None
    status: ProjectStatus = ProjectStatus.DISCOVERY
    tech_stack: list[str] = []
    budget: str | None = None


class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    client_id: str
    title: str
    description: str | None
    status: ProjectStatus
    tech_stack: list[str]
    budget: str | None
    created_at: datetime


class PortfolioItemCreate(BaseModel):
    title: str
    description: str
    image_url: str
    tech_stack: list[str] = []
    live_url: str | None = None
    github_url: str | None = None


class PortfolioItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    description: str
    image_url: str
    tech_stack: list[str]
    live_url: str | None
    github_url: str | None
