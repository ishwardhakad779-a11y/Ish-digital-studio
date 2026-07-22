"""
Email notification service.

This uses Python's built-in smtplib against SMTP_HOST/PORT/USER/PASSWORD from settings.
Works with any SMTP provider (Gmail App Password, SendGrid, Resend SMTP, Zoho, etc).
If SMTP_HOST is not configured, emails are skipped (logged only) so the API keeps working
in development without crashing.
"""
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.config.settings import settings

logger = logging.getLogger("ish_digital_studio.email")


def _send_email(to_email: str, subject: str, html_body: str) -> bool:
    if not settings.SMTP_HOST or not settings.SMTP_USER:
        logger.info(f"[EMAIL SKIPPED - no SMTP configured] To: {to_email} | Subject: {subject}")
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = settings.SMTP_FROM_EMAIL
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_FROM_EMAIL, [to_email], msg.as_string())
        return True
    except Exception as exc:
        logger.error(f"Failed to send email to {to_email}: {exc}")
        return False


def send_contact_confirmation(name: str, to_email: str) -> bool:
    subject = "We received your message — ISH Digital Studio"
    body = f"""
    <div style="font-family: sans-serif; background:#020617; color:#fff; padding: 24px;">
      <h2 style="color:#00E5FF;">Hi {name},</h2>
      <p>Thanks for reaching out to ISH Digital Studio. We've received your message
      and will get back to you within 24 hours.</p>
      <p>— Ishwar Dhakad<br/>Founder, ISH Digital Studio</p>
    </div>
    """
    return _send_email(to_email, subject, body)


def send_admin_notification(subject_prefix: str, name: str, email: str, phone: str, details: str) -> bool:
    subject = f"{subject_prefix}: New submission from {name}"
    body = f"""
    <div style="font-family: sans-serif; padding: 16px;">
      <h3>{subject_prefix}</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Details:</strong><br/>{details}</p>
    </div>
    """
    return _send_email(settings.ADMIN_NOTIFICATION_EMAIL, subject, body)
