from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


# ---------- Auth Schemas ----------


class UserRegister(BaseModel):
    """Schema for user registration request."""

    full_name: str = Field(..., min_length=2, max_length=100, examples=["Jayshree Wagh"])
    email: EmailStr = Field(..., examples=["jayshree@example.com"])
    password: str = Field(..., min_length=6, max_length=128, examples=["SecurePass123"])
    phone: Optional[str] = Field(None, max_length=20, examples=["+91 77989 65186"])
    city: Optional[str] = Field(None, max_length=100, examples=["Pune"])


class UserLogin(BaseModel):
    """Schema for login request."""

    email: EmailStr = Field(..., examples=["jayshree@example.com"])
    password: str = Field(..., examples=["SecurePass123"])


class Token(BaseModel):
    """Schema for JWT token response."""

    access_token: str
    token_type: str = "bearer"


# ---------- User Schemas ----------


class UserResponse(BaseModel):
    """Schema for user profile response (no password)."""

    id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    city: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    """Generic message response."""

    message: str
