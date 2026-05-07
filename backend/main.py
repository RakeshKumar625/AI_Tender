from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base
import models
import os

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CRPF Tender Evaluation System", version="1.0.0")

# CORS - Support both local development and production
allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174"
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers later when they are created
from routers import upload, extract, evaluate, review, report, audit, auth, system

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(system.router, prefix="/api/system", tags=["System"])
app.include_router(upload.router, prefix="/api/upload", tags=["Upload"])
app.include_router(extract.router, prefix="/api/extract", tags=["Extract"])
app.include_router(evaluate.router, prefix="/api/evaluate", tags=["Evaluate"])
app.include_router(review.router, prefix="/api/review", tags=["Review"])
app.include_router(report.router, prefix="/api/report", tags=["Report"])
app.include_router(audit.router, prefix="/api/audit", tags=["Audit"])

# Serve built frontend assets when deploying as a single combined app.
# Render deploys this repo as a backend-only service, so `static/` may not exist.
static_dir = "static"
if os.path.isdir(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
