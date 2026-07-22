from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.project import PortfolioItem
from app.models.testimonial import Testimonial
from app.schemas.project import PortfolioItemOut
from app.schemas.billing import TestimonialOut

router = APIRouter(tags=["Public Content"])


@router.get("/portfolio", response_model=list[PortfolioItemOut])
def list_portfolio(db: Session = Depends(get_db)):
    return db.query(PortfolioItem).filter(PortfolioItem.is_published == "true").all()


@router.get("/testimonials", response_model=list[TestimonialOut])
def list_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).filter(Testimonial.is_published == True).all()  # noqa: E712
