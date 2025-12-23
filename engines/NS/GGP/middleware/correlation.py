# api/middleware/correlation.py
from __future__ import annotations

from dataclasses import dataclass
from typing import Callable, Optional
from uuid import UUID, uuid4

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

# Header conventions
CORRELATION_HEADER = "X-Correlation-Id"
CAUSATION_HEADER = "X-Causation-Id"  # optional (advanced), can be omitted by clients


@dataclass(frozen=True)
class CorrelationContext:
    correlation_id: UUID
    causation_id: Optional[UUID] = None


def _parse_uuid(value: Optional[str]) -> Optional[UUID]:
    if not value:
        return None
    try:
        return UUID(value)
    except Exception:
        return None


def get_correlation_context(request: Request) -> CorrelationContext:
    """
    Retrieve correlation context for this request.
    - If the client provides X-Correlation-Id, it is used (if valid UUID).
    - Otherwise a new UUID is generated.
    - X-Causation-Id is optional and only used if provided and valid.
    """
    cid = _parse_uuid(request.headers.get(CORRELATION_HEADER)) or uuid4()
    caus = _parse_uuid(request.headers.get(CAUSATION_HEADER))
    return CorrelationContext(correlation_id=cid, causation_id=caus)


class CorrelationIdMiddleware(BaseHTTPMiddleware):
    """
    Middleware that:
    - Establishes a correlation_id for every request
    - Stores it on request.state.correlation (CorrelationContext)
    - Returns it to callers via X-Correlation-Id response header
    """

    async def dispatch(self, request: Request, call_next: Callable):
        ctx = get_correlation_context(request)
        request.state.correlation = ctx

        response: Response = await call_next(request)

        # Always return correlation id (helps client-side tracing/debugging)
        response.headers[CORRELATION_HEADER] = str(ctx.correlation_id)
        if ctx.causation_id:
            response.headers[CAUSATION_HEADER] = str(ctx.causation_id)

        return response