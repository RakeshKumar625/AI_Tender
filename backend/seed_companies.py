"""
seed_companies.py
-----------------
Populates the database with 5 realistic dummy bidder company accounts.
Run from the backend/ directory:
    ..\.venv\Scripts\python.exe seed_companies.py

Re-running is safe -- existing accounts are skipped.
To force-refresh, pass --reset flag:
    ..\.venv\Scripts\python.exe seed_companies.py --reset
"""

import sys
from database import SessionLocal
import models
from auth import get_password_hash

# ---------------------------------------------------------------------------
# Dummy company data — 5 distinct companies across different sectors
# ---------------------------------------------------------------------------
DUMMY_COMPANIES = [
    {
        # IT & Cybersecurity company — large, ISO certified, high turnover
        "email": "techbridge.solutions@bid.com",
        "password": "TechBridge@2024",
        "role": "bidder",
        "company_name": "TechBridge Solutions Pvt. Ltd.",
        "gst_number": "27AABCT3518Q1Z5",
        "phone_number": "+91-9812345678",
        "address": "Plot No. 42, Sector 18, Gurugram, Haryana – 122015",
    },
    {
        # Civil Infrastructure & Construction — medium, PAN India projects
        "email": "infrazone.builders@bid.com",
        "password": "InfraZone@2024",
        "role": "bidder",
        "company_name": "InfraZone Builders & Contractors Ltd.",
        "gst_number": "07AAACI1234B1ZN",
        "phone_number": "+91-8800456789",
        "address": "A-101, Connaught Place, New Delhi – 110001",
    },
    {
        # Software & AI Products — startup, Bengaluru tech hub
        "email": "nexasoft.tech@bid.com",
        "password": "NexaSoft@2024",
        "role": "bidder",
        "company_name": "NexaSoft Technologies LLP",
        "gst_number": "29AABFN7890C1ZP",
        "phone_number": "+91-9611234567",
        "address": "WeWork Galaxy, 43 Residency Road, Bengaluru – 560025",
    },
    {
        # Physical Security & Surveillance — niche government contractor
        "email": "safeguard.systems@bid.com",
        "password": "SafeGuard@2024",
        "role": "bidder",
        "company_name": "SafeGuard Security Systems Pvt. Ltd.",
        "gst_number": "24AADCS5678D1ZQ",
        "phone_number": "+91-9727654321",
        "address": "Survey No. 112, GIDC Estate Phase-III, Vatva, Ahmedabad – 382445",
    },
    {
        # Logistics, Supply Chain & Warehousing — South India base
        "email": "alpine.logistics@bid.com",
        "password": "Alpine@2024",
        "role": "bidder",
        "company_name": "Alpine Logistics & Supply Chain Co.",
        "gst_number": "33AABCA4321E1ZR",
        "phone_number": "+91-9500112233",
        "address": "Old No. 4, New No. 9, Rajiv Gandhi Salai, Sholinganallur, Chennai – 600119",
    },
]


def seed(reset: bool = False):
    db = SessionLocal()
    created, skipped, deleted = 0, 0, 0

    if reset:
        print("  [RESET]   Removing existing dummy bidder accounts...")
        for company in DUMMY_COMPANIES:
            user = db.query(models.User).filter(
                models.User.email == company["email"]
            ).first()
            if user:
                db.delete(user)
                deleted += 1
        db.commit()
        print(f"  [RESET]   {deleted} accounts removed.\n")

    for company in DUMMY_COMPANIES:
        existing = db.query(models.User).filter(
            models.User.email == company["email"]
        ).first()

        if existing:
            print(f"  [SKIP]    {company['company_name']} ({company['email']}) — already exists.")
            skipped += 1
            continue

        new_user = models.User(
            email=company["email"],
            hashed_password=get_password_hash(company["password"]),
            role=company["role"],
            company_name=company["company_name"],
            gst_number=company["gst_number"],
            phone_number=company["phone_number"],
            address=company["address"],
        )
        db.add(new_user)
        created += 1
        print(f"  [CREATED] {company['company_name']} ({company['email']})")

    db.commit()
    db.close()
    print(f"\nDone! {created} companies created, {skipped} skipped.")


if __name__ == "__main__":
    reset_flag = "--reset" in sys.argv
    seed(reset=reset_flag)
