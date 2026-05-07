# 🚀 Quick Heroku Deployment Setup

Follow these steps to deploy your AI Tender Evaluation System to Heroku:

## Step 1: Install Heroku CLI

### Windows
```powershell
# Using Chocolatey
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### macOS
```bash
brew tap heroku/brew && brew install heroku
```

### Verify Installation
```bash
heroku --version
```

---

## Step 2: Login to Heroku

```bash
heroku login
```

This will open a browser window for authentication.

---

## Step 3: Create Heroku App

```bash
heroku create your-unique-app-name
```

**Choose a unique name** (will be used in your URL). Examples:
- `crpf-tender-eval`
- `ai-tender-system`
- `tender-procurement-ai`

**You'll get:**
- App URL: `https://your-app-name.herokuapp.com`
- Git remote: `heroku`

---

## Step 4: Set Environment Variables

```bash
# Very important - generate a secure key
# On Windows PowerShell:
$key = -join ((0..9) + ('A'..'Z') + ('a'..'z') + ('-', '_') | Get-Random -Count 32)
Write-Host $key

# Then set it on Heroku:
heroku config:set SECRET_KEY="your-generated-key"
heroku config:set ALLOWED_ORIGINS="https://your-app-name.herokuapp.com"
heroku config:set ENVIRONMENT="production"
```
If you deploy the frontend separately, set `VITE_API_URL` in your frontend host to your backend URL.
---

## Step 5: Deploy Application

```bash
git push heroku main
```

**This will:**
1. Upload code to Heroku
2. Install Python dependencies
3. Build the application
4. Start the web dyno

**Watch deployment logs:**
```bash
heroku logs --tail
```

Press `Ctrl+C` to exit logs.

---

## Step 6: Initialize Database

```bash
heroku run "cd backend && python create_admin.py"
```

This creates the admin user. You'll be prompted for:
- Email: `admin@crpf.gov.in` (or your choice)
- Password: (set a strong password)

---

## Step 7: Test Application

### Check if running
```bash
heroku ps
```

### Open in browser
```bash
heroku open
```

Or manually visit: `https://your-app-name.herokuapp.com`

### Test API
```bash
curl https://your-app-name.herokuapp.com/
```

### View API Docs
Visit: `https://your-app-name.herokuapp.com/docs`

---

## Step 8: Monitor & Debug

### View Logs
```bash
# Last 100 lines
heroku logs --num 100

# Continuous streaming
heroku logs --tail

# Specific dyno errors
heroku logs --dyno web
```

### Restart if Needed
```bash
heroku restart
```

### Check Dyno Status
```bash
heroku ps
```

---

## 🎯 Quick Command Reference

```bash
# Create app
heroku create app-name

# Set environment variables
heroku config:set KEY=VALUE

# View configuration
heroku config

# Deploy
git push heroku main

# View logs
heroku logs --tail

# Run command
heroku run "command"

# Open app
heroku open

# Check status
heroku ps

# Restart
heroku restart

# Destroy app (if needed)
heroku apps:destroy --app app-name
```

---

## ⚠️ Common Issues

### Application fails to start
```bash
heroku logs --tail
# Check for dependency or syntax errors
```

### Can't connect to API
```bash
# Update CORS
heroku config:set ALLOWED_ORIGINS="https://your-app-name.herokuapp.com"

# Restart
heroku restart
```

### Database not found
```bash
# Reinitialize database
heroku run "cd backend && python -c \"from database import Base, engine; Base.metadata.create_all(bind=engine)\""
```

### Port issues
Check `Procfile` has correct port configuration:
```
web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## 📊 After Deployment

1. ✅ Test admin login
2. ✅ Test API endpoints
3. ✅ Check database initialization
4. ✅ Monitor logs for errors
5. ✅ Set up custom domain (optional)
6. ✅ Configure CI/CD (optional)

---

## 🔗 Helpful Links

- Heroku Dashboard: https://dashboard.heroku.com
- Documentation: https://devcenter.heroku.com
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/
- Troubleshooting: https://devcenter.heroku.com/articles/troubleshooting-deploys

---

**Need help?** Refer to `DEPLOYMENT.md` for detailed instructions.