"""
Run this once to create all tables and seed the first admin user.

Usage:
    python -m app.seed
"""
from app.database.session import engine, SessionLocal, Base
from app.models.user import User, UserRole
from app.utils.security import hash_password
from app.config.settings import settings

# Import all models so they register on Base.metadata before create_all
import app.models  # noqa: F401


def init_db():
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created.")


def seed_admin():
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if existing:
            print(f"Admin user {settings.ADMIN_EMAIL} already exists. Skipping.")
            return

        admin = User(
            full_name="Ishwar Dhakad",
            email=settings.ADMIN_EMAIL,
            hashed_password=hash_password(settings.ADMIN_INITIAL_PASSWORD),
            role=UserRole.ADMIN,
            is_active=True,
        )
        db.add(admin)
        db.commit()
        print(f"Admin user created: {settings.ADMIN_EMAIL}")
        print("IMPORTANT: log in and change this password immediately.")
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
    seed_admin()
