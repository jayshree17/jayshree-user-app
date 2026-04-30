from sqlalchemy.orm import Session
from app.models import User
from app.auth import hash_password
from app.schemas import UserRegister


def get_user_by_email(db: Session, email: str) -> User | None:
    """Look up a user by email address."""
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user_data: UserRegister) -> User:
    """Create a new user with a hashed password."""
    db_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        phone=user_data.phone,
        city=user_data.city,
        hashed_password=hash_password(user_data.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
