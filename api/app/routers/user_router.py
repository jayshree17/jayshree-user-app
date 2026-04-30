from fastapi import APIRouter, Depends

from app.auth import get_current_user
from app.models import User
from app.schemas import UserResponse

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user profile",
)
def get_my_profile(current_user: User = Depends(get_current_user)):
    """
    Return the authenticated user's profile details.
    Requires a valid JWT token in the Authorization header.
    """
    return current_user
