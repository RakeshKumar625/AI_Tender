from fastapi import APIRouter
from datetime import datetime
import pytz

router = APIRouter()

@router.get("/time")
async def get_system_time():
    # Set timezone to Asia/Kolkata as requested/typical for CRPF context
    tz = pytz.timezone('Asia/Kolkata')
    now = datetime.now(tz)
    
    return {
        "date": now.strftime("%Y-%m-%d"),
        "time": now.strftime("%H:%M:%S"),
        "timezone": "Asia/Kolkata",
        "timestamp": now.isoformat()
    }
