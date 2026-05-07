import sys
from database import SessionLocal
import models
from auth import get_password_hash

def create_admin(email, password):
    db = SessionLocal()
    user = db.query(models.User).filter(models.User.email == email).first()
    if user:
        print(f"User {email} already exists. Updating password and role...")
        user.hashed_password = get_password_hash(password)
        user.role = "admin"
    else:
        print(f"Creating new admin {email}...")
        hashed_password = get_password_hash(password)
        user = models.User(
            email=email,
            hashed_password=hashed_password,
            role="admin",
            company_name="CRPF Admin"
        )
        db.add(user)
    db.commit()
    db.close()
    print("Admin user successfully configured.")

if __name__ == "__main__":
    create_admin("rakeshmahto625@gmail.com", "Rakesh@625")
