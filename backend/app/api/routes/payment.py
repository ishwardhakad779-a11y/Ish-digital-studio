from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import razorpay
import hmac
import hashlib

from app.config.settings import settings

router = APIRouter(prefix="/payment", tags=["Payment"])

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


class CreateOrderRequest(BaseModel):
    amount: int  # amount in rupees (e.g. 4999)
    plan_name: str


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


@router.post("/create-order")
def create_order(payload: CreateOrderRequest):
    try:
        order = client.order.create({
            "amount": payload.amount * 100,  # Razorpay expects paise
            "currency": "INR",
            "receipt": f"order_{payload.plan_name}",
            "notes": {"plan": payload.plan_name},
        })
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": settings.RAZORPAY_KEY_ID,
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Order creation failed: {exc}")


@router.post("/verify")
def verify_payment(payload: VerifyPaymentRequest):
    generated_signature = hmac.new(
        settings.RAZORPAY_KEY_SECRET.encode(),
        f"{payload.razorpay_order_id}|{payload.razorpay_payment_id}".encode(),
        hashlib.sha256,
    ).hexdigest()

    if generated_signature != payload.razorpay_signature:
        raise HTTPException(status_code=400, detail="Payment verification failed")

    # TODO: mark order as paid in database here

    return {"status": "success", "message": "Payment verified successfully"}