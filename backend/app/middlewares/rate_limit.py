"""
Simple in-memory rate limiter to protect public endpoints (contact/consultation forms)
from spam and abuse. For multi-instance production deployments, swap this for a
Redis-backed limiter (e.g. slowapi + Redis).
"""
import time
from collections import defaultdict
from fastapi import Request, HTTPException, status

WINDOW_SECONDS = 60
MAX_REQUESTS_PER_WINDOW = 5

_hits: dict[str, list[float]] = defaultdict(list)


async def rate_limit_middleware(request: Request, call_next):
    if request.url.path in ("/api/contact", "/api/consultation"):
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        _hits[client_ip] = [t for t in _hits[client_ip] if now - t < WINDOW_SECONDS]

        if len(_hits[client_ip]) >= MAX_REQUESTS_PER_WINDOW:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests. Please try again in a minute.",
            )
        _hits[client_ip].append(now)

    return await call_next(request)
