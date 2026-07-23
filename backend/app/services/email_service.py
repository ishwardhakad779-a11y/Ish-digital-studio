"""
Email notification service.

Uses Resend's HTTPS API instead of raw SMTP, since Render's free tier blocks
outbound SMTP ports (25/587/465). Resend works over HTTPS (443), which is not blocked.
If RESEND_API_KEY is not configured, emails are skipped (logged only) so the API keeps
working in development without crashing.
"""
import logging
import resend

from app.config.settings import settings

logger = logging.getLogger("ish_digital_studio.email")

resend.api_key = settings.RESEND_API_KEY


def _send_email(to_email: str, subject: str, html_body: str) -> bool:
    if not settings.RESEND_API_KEY:
        logger.info(f"[EMAIL SKIPPED - no RESEND_API_KEY configured] To: {to_email} | Subject: {subject}")
        return False

    try:
        resend.Emails.send({
            "from": settings.SMTP_FROM_EMAIL,
            "to": [to_email],
            "subject": subject,
            "html": html_body,
        })
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