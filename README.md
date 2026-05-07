# 🚀 AI Tender Evaluation System

<div align="center">

![AI Tender Logo](https://img.shields.io/badge/AI--Tender-Evaluation-blue?style=for-the-badge&logo=robot)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

[![GitHub stars](https://img.shields.io/github/stars/RakeshKumar625/AI_Tender?style=social)](https://github.com/RakeshKumar625/AI_Tender)
[![GitHub forks](https://img.shields.io/github/forks/RakeshKumar625/AI_Tender?style=social)](https://github.com/RakeshKumar625/AI_Tender)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Revolutionizing Tender Evaluation with AI for CRPF Procurement**

[📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🎯 Key Features](#-key-features) • [🛠️ Technology Stack](#-technology-stack)

---

</div>

##  Overview

Welcome to the **AI Tender Evaluation System** - an intelligent, automated solution designed specifically for the **Central Reserve Police Force (CRPF)** procurement processes. This cutting-edge platform leverages advanced **AI/ML technologies** to transform traditional manual tender evaluation into a streamlined, accurate, and transparent digital workflow.

> **"Transforming procurement from paperwork to intelligence-driven decisions"**

---

##  Key Features

###  AI-Powered Intelligence
- ** Advanced OCR**: Multi-engine text extraction from PDFs, DOCX, and images using PaddleOCR + Tesseract
- ** NLP Processing**: Intelligent document analysis with spaCy and sentence transformers
- ** Automated Evaluation**: Smart qualification assessment against complex criteria
- ** Precision Matching**: Context-aware evidence extraction and validation

###  Multi-Role Architecture
- ** Admin Dashboard**: Complete tender lifecycle management and oversight
- ** Bidder Portal**: Seamless registration, document submission, and status tracking
- ** Real-time Updates**: Live status monitoring and notification system

###  Enterprise-Grade Security
- ** Role-Based Access**: Granular permissions for admins and bidders
- ** JWT Authentication**: Secure, stateless authentication system
- ** Audit Trail**: Comprehensive activity logging and compliance tracking
- ** Manual Review**: Human oversight for complex evaluation cases

###  Analytics & Reporting
- ** Performance Metrics**: Detailed evaluation statistics and insights
- ** Custom Reports**: Flexible reporting for procurement analysis
- ** Data Visualization**: Interactive charts and dashboards

---

## 🛠️ Technology Stack

<div align="center">

### Backend Architecture
```mermaid
graph TB
    A[FastAPI] --> B[SQLAlchemy ORM]
    A --> C[AI/ML Pipeline]
    C --> D[PaddleOCR]
    C --> E[spaCy NLP]
    C --> F[sentence-transformers]
    B --> G[SQLite/PostgreSQL]
```

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Framework** | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi) | High-performance async API |
| **Database** | ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-1.4.46-red?style=flat) | ORM & Database Operations |
| **OCR Engine** | ![PaddleOCR](https://img.shields.io/badge/PaddleOCR-2.7.0-blue?style=flat) | Document Text Extraction |
| **NLP** | ![spaCy](https://img.shields.io/badge/spaCy-3.7.2-09A3D5?style=flat) | Natural Language Processing |
| **AI/ML** | ![Transformers](https://img.shields.io/badge/sentence--transformers-2.2.2-yellow?style=flat) | Text Similarity & Embeddings |

### Frontend Architecture
| Component | Technology | Purpose |
|-----------|------------|---------|
| **Framework** | ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react) | Modern UI Framework |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=flat&logo=typescript) | Type-Safe Development |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite) | Fast Development Server |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css) | Utility-First CSS |
| **Routing** | ![React Router](https://img.shields.io/badge/React_Router-6.14-CA4245?style=flat&logo=react-router) | Client-Side Navigation |
| **Charts** | ![Recharts](https://img.shields.io/badge/Recharts-2.7.1-22B5BF?style=flat) | Data Visualization |

</div>

---

## 📁 Project Structure

```
🗂️ AI_Tender/
├── 🔧 backend/                    # FastAPI Backend
│   ├──  routers/               # API Endpoints
│   │   ├──  auth.py            # Authentication
│   │   ├──  upload.py          # File Upload
│   │   ├──  extract.py         # Document Processing
│   │   ├──  evaluate.py        # AI Evaluation
│   │   └──  report.py          # Analytics
│   ├──  models.py              # Database Models
│   ├──  auth.py                # Auth Logic
│   ├──  database.py            # DB Config
│   └──  requirements.txt       # Dependencies
├──  frontend/                   # React Frontend
│   ├──  src/
│   │   ├──  components/        # UI Components
│   │   ├──  pages/            # Page Components
│   │   ├──  context/          # State Management
│   │   └──  App.tsx           # Main App
│   └──  package.json          # Dependencies
├──  README.md                  # Documentation
└──  .gitignore                # Git Ignore Rules
```

---

##  Quick Start

###  Prerequisites
- ![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python) Python 3.11 or higher
- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js) Node.js 18 or higher
- ![Git](https://img.shields.io/badge/Git-2.30+-F05032?style=flat&logo=git) Git for version control

###  Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/RakeshKumar625/AI_Tender.git
cd AI_Tender
```

#### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### 3. Frontend Setup
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 4. Database Initialization
```bash
# In backend directory (with venv activated)
python create_admin.py  # Create admin user
python seed_companies.py  # Optional: Seed sample data
```

###  Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

---

##  Documentation

### API Reference
Once the backend is running, explore the interactive API documentation:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### System Architecture
```mermaid
sequenceDiagram
    participant Admin
    participant System
    participant AI
    participant Bidder

    Admin->>System: Create Tender + Criteria
    Bidder->>System: Register & Upload Documents
    System->>AI: Extract Evidence
    AI->>System: Return Extracted Data
    System->>AI: Evaluate Against Criteria
    AI->>System: Qualification Results
    System->>Admin: Evaluation Dashboard
    System->>Bidder: Status Updates
```

---

##  Demo & Screenshots

<div align="center">

### Admin Dashboard
*Coming Soon - Tender Management Interface*

### Bidder Portal
*Coming Soon - Document Upload & Status Tracking*

### AI Evaluation Results
*Coming Soon - Automated Qualification Assessment*

</div>

---

##  Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1.  **Fork** the repository
2.  **Create** a feature branch: `git checkout -b feature/amazing-feature`
3.  **Develop** your feature
4.  **Test** thoroughly
5.  **Commit** changes: `git commit -m 'Add amazing feature'`
6.  **Push** to branch: `git push origin feature/amazing-feature`
7.  **Open** a Pull Request

### Code Standards
-  **Linting**: ESLint for frontend, Black for backend
-  **Testing**: Write tests for new features
-  **Documentation**: Update docs for API changes
-  **Commits**: Use conventional commit messages

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Developed exclusively for CRPF procurement processes.**

---

##  Contact & Support

<div align="center">

**Got questions? We'd love to hear from you!**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/rakeshkumar625)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RakeshKumar625)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rakesh@example.com)

**Rakesh Kumar** - *Project Lead & Developer*

---

** Star this repository if you find it useful!**

*Made with for efficient and transparent procurement processes*

</div>
