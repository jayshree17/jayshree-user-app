from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import UserRegister, UserLogin, Token, UserResponse, MessageResponse
from app.crud import get_user_by_email, create_user
from app.auth import verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """
    Create a new user account.

    - **full_name**: User's full name (2–100 chars)
    - **email**: Unique email address
    - **password**: Min 6 characters
    - **phone**: Optional phone number
    - **city**: Optional city/location
    """
    # Check if email already exists
    existing = get_user_by_email(db, user_data.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    user = create_user(db, user_data)
    return user


@router.post(
    "/login",
    response_model=Token,
    summary="Login and get JWT token",
)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate with email and password.
    Returns a JWT access token on success.
    """
    user = get_user_by_email(db, credentials.email)
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=token)


@router.post(
    "/token",
    response_model=Token,
    summary="Login via form (Swagger Authorize)",
)
def login_form(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    OAuth2-compatible token endpoint for Swagger UI Authorize button.
    Uses 'username' field as email.
    """
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=token)
