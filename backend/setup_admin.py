"""
Script untuk membuat atau mereset user admin.
Jalankan dari folder backend/:
    python setup_admin.py

Credentials yang dibuat:
    Username : admin
    Password : admin123
    Email    : admin@tkarrahman.sch.id
"""

import sys
import os

# Pastikan import berjalan dari folder backend
sys.path.insert(0, os.path.dirname(__file__))

from app.database import SessionLocal, engine, Base
from app.models import User
from app.auth_utils import get_password_hash


def setup_admin():
    # Buat tabel jika belum ada
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        existing = db.query(User).filter(User.username == "admin").first()
        hashed = get_password_hash("admin123")

        if existing:
            # Reset password dan pastikan is_admin = True
            existing.hashed_password = hashed
            existing.is_admin = True
            existing.is_active = True
            db.commit()
            db.refresh(existing)
            print("=" * 50)
            print("[OK] Admin password berhasil direset!")
            print(f"     Username : {existing.username}")
            print(f"     Password : admin123")
            print(f"     Email    : {existing.email}")
            print(f"     Is Admin : {existing.is_admin}")
            print("=" * 50)
        else:
            # Buat admin baru
            admin = User(
                username="admin",
                email="admin@tkarrahman.sch.id",
                hashed_password=hashed,
                is_admin=True,
                is_active=True,
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)
            print("=" * 50)
            print("[OK] Admin berhasil dibuat!")
            print(f"     Username : {admin.username}")
            print(f"     Password : admin123")
            print(f"     Email    : {admin.email}")
            print(f"     Is Admin : {admin.is_admin}")
            print("=" * 50)

    except Exception as e:
        print(f"[ERROR] {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    setup_admin()
