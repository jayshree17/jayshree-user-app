from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base
from app.routers import auth_router, user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create database tables on startup."""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    yield


app = FastAPI(
    title=settings.APP_NAME,
    description="User registration, authentication, and profile management API.",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# CORS — allow frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(auth_router.router)
app.include_router(user_router.router)


@app.get("/api/health", tags=["Health"])
def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": settings.APP_NAME}
