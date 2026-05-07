# 🚀 Deployment Guide - AI Tender Evaluation System

This guide provides step-by-step instructions for deploying the AI Tender Evaluation System to Heroku.

## 📋 Prerequisites

Before starting the deployment, ensure you have:

1. **Heroku Account** - Sign up at [heroku.com](https://www.heroku.com)
2. **Heroku CLI** - Install from [Heroku CLI Download](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git** - Already installed (verify with `git --version`)
4. **GitHub Account** - For source code management
5. **Node.js & npm** - For frontend deployment

### Verify Installation

```bash
heroku --version
git --version
node --version
npm --version
```

---

## 🔧 Step 1: Prepare the Application

### 1.1 Update Environment Variables

Copy `.env.example` to `.env` and update sensitive values:

```bash
cp .env.example .env
```

**Important variables to update:**
- `SECRET_KEY` - Generate a strong random key for JWT
- `ALLOWED_ORIGINS` - Update with your Heroku app URL (you'll get this after app creation)
- `DATABASE_URL` - Leave as default for SQLite (will be updated after deployment)

### 1.2 Update Backend Configuration

Edit `backend/database.py` to handle environment variables:

```python
import os
from sqlalchemy import create_engine

# Get database URL from environment or use default
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./tender_system.db")

# For SQLite compatibility
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URL)
```

### 1.3 Update Backend CORS Settings

Edit `backend/main.py` to read allowed origins from environment:

```python
import os

allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 1.4 Verify requirements.txt

Ensure all dependencies are listed:

```bash
cd backend
pip freeze > requirements.txt
cd ..
```

---

## 📱 Step 2: Frontend Build Configuration

### 2.1 Create Production Build Script

Update `frontend/package.json` build script:

```json
{
  "scripts": {
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

### 2.2 Update API Endpoint

In `frontend/src/context/AuthContext.tsx`, the frontend uses Vite environment variables:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

Set `VITE_API_URL` in your frontend `.env` or hosting environment to point to the production backend.

---

## ☁️ Step 3: Deploy to Heroku

### 3.1 Login to Heroku

```bash
heroku login
```

This will open a browser window to authenticate. Complete the login process.

### 3.2 Create Heroku Application

```bash
heroku create your-app-name
```

Replace `your-app-name` with your desired application name (must be unique).

**Example:**
```bash
heroku create crpf-tender-eval
```

You'll get a URL like: `https://crpf-tender-eval.herokuapp.com`

### 3.3 Set Environment Variables

```bash
heroku config:set SECRET_KEY="your-very-secure-random-key-here"
heroku config:set ENVIRONMENT="production"
heroku config:set ALLOWED_ORIGINS="https://your-app-name.herokuapp.com"
```

### 3.4 Deploy Code

```bash
git push heroku main
```

**What Heroku does:**
1. Installs Python dependencies from `requirements.txt`
2. Builds the application based on `Procfile`
3. Starts the application on a random Heroku dyno

### 3.5 Initialize Database

After deployment, initialize the database:

```bash
heroku run "cd backend && python create_admin.py"
```

This creates the first admin user.

### 3.6 View Logs

```bash
heroku logs --tail
```

This shows real-time logs. Press `Ctrl+C` to exit.

---

## 🌐 Step 4: Frontend Deployment (Optional)

### Option A: Deploy Frontend Separately (Recommended)

#### Using Vercel (Easy)

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Update backend CORS with Vercel URL
heroku config:set ALLOWED_ORIGINS="https://your-frontend-url.vercel.app,https://your-app-name.herokuapp.com"
```

#### Using Netlify

```bash
cd frontend

# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Option B: Serve Frontend from Backend

If you want to serve both from the same Heroku app:

1. Build the frontend:
```bash
cd frontend
npm run build
cd ..
```

2. Copy build to backend static folder:
```bash
mkdir -p backend/static
cp -r frontend/dist/* backend/static/
```

3. Update `backend/main.py` to serve static files (already configured in this repo):
```python
from fastapi.staticfiles import StaticFiles

app.mount("/", StaticFiles(directory="static", html=True), name="static")
```

> Note: The repository Dockerfile now performs a multi-stage build. It builds the frontend, copies `frontend/dist` into `backend/static`, and then starts the Python backend automatically.

---

## ✅ Step 5: Verification

### Test the Application

1. **Visit your app URL:**
   ```
   https://your-app-name.herokuapp.com
   ```

2. **Check Backend Health:**
   ```bash
   curl https://your-app-name.herokuapp.com/
   ```

3. **Access API Docs:**
   ```
   https://your-app-name.herokuapp.com/docs
   ```

4. **Test Login:**
   - Navigate to auth/selection
   - Try admin login with credentials created in Step 3.5

### View Application Metrics

```bash
heroku open
heroku metrics
```

---

## 🔒 Step 6: Production Security

### 6.1 Update Secret Key

Generate a strong secret key:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Set it on Heroku:

```bash
heroku config:set SECRET_KEY="your-generated-key"
```

### 6.2 Enable HTTPS

HTTPS is automatically enabled on Heroku domains.

### 6.3 Set Production Environment

```bash
heroku config:set ENVIRONMENT="production"
```

### 6.4 Database Backups

For SQLite, Heroku ephemeral file systems mean the database resets on restart. For production:

**Option 1:** Use Heroku Postgres (Recommended)
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

**Option 2:** Use External Database
- Set `DATABASE_URL` to your PostgreSQL instance
- Update connection string in environment variables

---

## � Railway Deployment (Free Alternative)

Railway can deploy this repo using the root `Dockerfile` added to the project.

### 1. Create a new Railway project
- Sign into Railway at https://railway.app
- Create a new project and link your GitHub repository

### 2. Use the existing root Dockerfile
Railway will detect `Dockerfile` at the repository root and build the backend service from the `backend` folder.

### 3. Configure Railway environment variables
- `SECRET_KEY` = strong random key
- `ALLOWED_ORIGINS` = Railway backend URL (for example `https://<your-service>.railway.app`)
- `ENVIRONMENT` = `production`
- `DATABASE_URL` = provided by Railway Postgres plugin

### 4. Add a PostgreSQL plugin in Railway
- Add `PostgreSQL` from Railway plugins
- Railway will provide `DATABASE_URL` automatically

### 5. Deploy
- Trigger a new deployment in Railway
- If the build succeeds, Railway will start the backend on the assigned port

---

## �📊 Step 7: Monitoring & Maintenance

### View Logs

```bash
# Last 100 lines
heroku logs --num 100

# Continuous streaming
heroku logs --tail

# Specific dyno
heroku logs --dyno web
```

### Monitor Performance

```bash
heroku metrics
```

### Restart Application

```bash
heroku restart
```

### Scale Dynos (if needed)

```bash
# Standard tier (more powerful)
heroku dyno:type web=standard-1s

# Check current dyos
heroku ps
```

---

## 🐛 Troubleshooting

### Application Fails to Start

```bash
heroku logs --tail
```

Check for:
- Missing dependencies in `requirements.txt`
- Syntax errors in code
- Environment variable issues

### Database Issues

```bash
# Connect to bash environment
heroku run bash

# Recreate database
cd backend
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"
python create_admin.py
```

### CORS Issues

```bash
heroku config:set ALLOWED_ORIGINS="https://your-app-name.herokuapp.com,https://your-frontend-url.com"
```

### Port Issues

Verify `Procfile` uses `$PORT`:
```
web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## 📈 Step 8: Custom Domain (Optional)

If you have a custom domain:

```bash
# Add domain
heroku domains:add www.yourdomain.com

# View domain setup
heroku domains
```

Then update your domain DNS records to point to Heroku.

---

## 🔄 Continuous Deployment

### Deploy from GitHub

1. Connect Heroku to GitHub:
```bash
heroku apps:info
```

2. In Heroku Dashboard → Deploy → GitHub → Connect
3. Enable automatic deploys from main branch

### Manual Deploy

```bash
git push heroku main
```

---

## 📞 Support & Resources

- **Heroku Docs:** https://devcenter.heroku.com
- **FastAPI Deployment:** https://fastapi.tiangolo.com/deployment
- **React Deployment:** https://vitejs.dev/guide/build.html
- **PostgreSQL on Heroku:** https://www.heroku.com/postgres

---

## ✨ Post-Deployment Checklist

- [ ] Application is accessible via Heroku URL
- [ ] API documentation works (`/docs`)
- [ ] Admin login works with created credentials
- [ ] Database is initialized with tables
- [ ] CORS is properly configured
- [ ] Secret key is set in production
- [ ] Logs show no errors
- [ ] Frontend connects to backend successfully
- [ ] All API endpoints are functional
- [ ] Audit trail logs are working

---

**Deployment Date:** May 7, 2026

**Questions or Issues?** Check Heroku documentation or refer to the troubleshooting section above.