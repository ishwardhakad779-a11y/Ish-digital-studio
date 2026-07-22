import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, String


class TimestampMixin:
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


def gen_uuid():
    return str(uuid.uuid4())


def uuid_pk_column():
    # Stored as VARCHAR (not native Postgres UUID type) so it matches the
    # plain String foreign key columns used across models (client_id, invoice_id, etc).
    return Column(String(36), primary_key=True, default=gen_uuid)