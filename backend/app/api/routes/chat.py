from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq

from app.config.settings import settings

router = APIRouter(prefix="/chat", tags=["Chat"])

client = Groq(api_key=settings.GROQ_API_KEY)

SYSTEM_PROMPT = """You are the AI assistant for ISH Digital Studio, a web development and AI automation agency based in Indore, India, founded by Ishwar Dhakad.

Services offered:
- Premium Business Websites
- AI Chatbots
- AI Voice Assistants
- Restaurant Websites
- Clinic Websites
- Gym Websites
- Business Automation
- Dashboard Development
- FastAPI Development
- SEO Optimization
- Website Maintenance

Pricing plans:
- Starter (₹4,999): 5-Page Website, Mobile Responsive, Basic SEO, Contact Form, 1 Revision
- Growth (₹8,499): Everything in Starter + AI Chatbot Integration, Booking/Appointment System, Advanced SEO, Admin Dashboard
- Enterprise (₹15,499): Everything in Growth + Custom AI Voice Assistant, Full Backend + Database, Business Automation, Priority Support

Timeline: Most websites delivered in 7-14 days.
Location: Works with businesses across India remotely.
Contact: WhatsApp +91 8085781850, Email ishwardhakad779@gmail.com

Be friendly, concise, and helpful. Answer questions about services, pricing, and process. If the user seems interested in getting a website built, naturally ask for their name, phone number, and what kind of business they have — then let them know Ishwar will reach out within 24 hours. Keep replies short (2-4 sentences), conversational, and avoid sounding like a script. Reply in the same language style the user writes in (Hindi/English/Hinglish)."""


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


@router.post("/")
def chat(payload: ChatRequest):
    try:
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages += [{"role": m.role, "content": m.content} for m in payload.messages]

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.7,
            max_tokens=300,
        )

        reply = response.choices[0].message.content
        return {"reply": reply}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Chat failed: {exc}")