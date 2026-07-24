from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    APP_NAME: str = "ISH Digital Studio API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_PREFIX: str = "/api"

    # Database (Supabase Postgres connection string)
    # Format: postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/ish_digital_studio"

    # JWT Auth
    JWT_SECRET_KEY: str = "change-this-secret-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:5173,https://ishdigitalstudio.com"

    # Admin bootstrap (used once by seed script to create first admin)
    ADMIN_EMAIL: str = "ishwardhakad779@gmail.com"
    ADMIN_INITIAL_PASSWORD: str = "change-this-password"

    # Email (SMTP) - for contact/consultation notifications
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "no-reply@ishdigitalstudio.com"
    ADMIN_NOTIFICATION_EMAIL: str = "ishwardhakad779@gmail.com"
    RESEND_API_KEY: str="re_UE6thQfC_7UZfLevfHj8rBAARvzVmrMCM"
    RAZORPAY_KEY_ID:str="rzp_test_TH5IVeFdOAAvFG"
    RAZORPAY_KEY_SECRET:str="XhI12FzWC9LYms2WykCF96Ju"
    GROQ_API_KEY:str=""

    class Config:
        env_file = ".env"
        case_sensitive = True

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
