from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

    # App
    APP_NAME: str = "ISH Digital Studio API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_PREFIX: str = "/api"

    # Database (Supabase Postgres connection string)
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/ish_digital_studio"

    # JWT Auth
    JWT_SECRET_KEY: str = "change-this-secret-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:5173,https://ishdigitalstudio.com"

    # Admin bootstrap
    ADMIN_EMAIL: str = "ishwardhakad779@gmail.com"
    ADMIN_INITIAL_PASSWORD: str = "change-this-password"

    # Email (SMTP)
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "no-reply@ishdigitalstudio.com"
    ADMIN_NOTIFICATION_EMAIL: str = "ishwardhakad779@gmail.com"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

if "localhost:5432/ish_digital_studio" in settings.DATABASE_URL:
    print(
        "\n⚠️  WARNING: DATABASE_URL is still the default placeholder.\n"
        "   Your .env file was not found or not loaded.\n"
        "   Make sure a '.env' file exists in the 'backend' folder "
        "(same folder as this command is run from) and contains DATABASE_URL=...\n"
    )