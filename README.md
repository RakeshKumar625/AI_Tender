# AI Tender Evaluation System

An AI-powered tender evaluation system for the Central Reserve Police Force (CRPF) that automates bidder qualification assessment using advanced OCR, NLP, and document analysis technologies.

## Features

### 🤖 AI-Powered Evaluation
- **OCR Integration**: Extracts text from PDFs, DOCX, and image documents using PaddleOCR and Tesseract
- **NLP Processing**: Analyzes document content using spaCy and sentence transformers
- **Automated Qualification**: Evaluates bidders against predefined criteria (turnover, projects, certifications)

### 👥 Multi-Role System
- **Admin Dashboard**: Tender creation, criteria management, evaluation monitoring, manual review
- **Bidder Portal**: Company registration, document upload, status tracking, submission history

### 🔒 Security & Audit
- **Role-based Access Control**: Separate interfaces for administrators and bidders
- **JWT Authentication**: Secure token-based authentication
- **Audit Trail**: Complete logging of all system activities
- **Manual Review System**: Handles edge cases requiring human intervention

## Tech Stack

### Backend
- **FastAPI**: High-performance async web framework
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Database (easily configurable for PostgreSQL)
- **AI/ML Libraries**:
  - PaddlePaddle/PaddleOCR for OCR
  - spaCy for NLP
  - sentence-transformers for text similarity

### Frontend
- **React 19**: Modern UI framework with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Recharts**: Data visualization

## Project Structure

```
AI_Tender/
├── backend/                 # FastAPI backend
│   ├── routers/            # API endpoints
│   ├── models.py           # Database models
│   ├── auth.py             # Authentication logic
│   ├── database.py         # Database configuration
│   └── requirements.txt    # Python dependencies
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── App.tsx         # Main app component
│   └── package.json        # Node dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Database Setup
```bash
cd backend
python create_admin.py  # Creates admin user
python seed_companies.py  # Seeds sample data (optional)
```

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

## Key Workflows

1. **Admin creates tender** with qualification criteria
2. **Bidders register** and upload supporting documents
3. **AI extracts information** from uploaded documents
4. **System evaluates** bidders against criteria
5. **Manual review** for ambiguous cases
6. **Audit trail** maintains complete activity log

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is developed for CRPF tender evaluation processes.

## Contact

For questions or support, please contact the development team.