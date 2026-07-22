from sqlalchemy import Column, String, Text, Integer, Boolean

from app.database.session import Base
from app.models.mixins import TimestampMixin, uuid_pk_column


class Testimonial(Base, TimestampMixin):
    __tablename__ = "testimonials"

    id = uuid_pk_column()
    client_name = Column(String(150), nullable=False)
    client_role = Column(String(150), nullable=True)
    quote = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    is_published = Column(Boolean, default=True, nullable=False)
