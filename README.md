# 🚀 Jayshree User App

Full-stack user management application with registration, login, and profile dashboard.

**Live at**: [app.jayshree.dev](https://app.jayshree.dev)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 17 (standalone components) |
| Backend | FastAPI (Python 3.11) |
| Database | PostgreSQL 16 |
| Auth | JWT (python-jose + bcrypt) |
| Proxy | Nginx |
| Containers | Docker + Docker Compose |
| CI/CD | GitHub Actions → ghcr.io → EC2 |

## Architecture

```
Browser → Nginx (:80) → Angular SPA (static files)
                       → /api/* → FastAPI (:8000) → PostgreSQL (:5432)
```

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for frontend dev)
- Python 3.11+ (for backend dev)

### Quick Start (Docker)

```bash
# Clone the repo
git clone https://github.com/jayshreewagh/jayshree-user-app.git
cd jayshree-user-app

# Copy env file
cp .env.example .env

# Start all services
docker compose up --build
```

Open [http://localhost](http://localhost) in your browser.

### Development Mode (without Docker)

**Backend:**
```bash
cd api
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:4200` with proxy to API at `:8000`.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login → JWT token |
| GET | `/api/users/me` | JWT | Get current user profile |

API docs available at `/api/docs` (Swagger UI).

## CI/CD Pipeline

On every push to `main`:
1. **Build** Docker images (API, Frontend, Nginx)
2. **Push** to GitHub Container Registry (ghcr.io)
3. **Deploy** to EC2 via SSH
4. **Health check** to verify deployment

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `EC2_HOST` | EC2 instance public IP |
| `EC2_USER` | SSH username (e.g., `ubuntu`) |
| `EC2_SSH_KEY` | Private SSH key for EC2 |
| `POSTGRES_DB` | Database name |
| `POSTGRES_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | JWT signing secret |

## Project Structure

```
jayshree-user-app/
├── frontend/          # Angular 17 SPA
├── api/               # FastAPI backend
├── nginx/             # Reverse proxy config
├── docker-compose.yml # Local development
├── docker-compose.prod.yml # Production
└── .github/workflows/ # CI/CD pipeline
```

---

Built by **Jayshree Wagh** • [LinkedIn](https://linkedin.com/in/jayshree-wagh) • [GitHub](https://github.com/jayshreewagh)
