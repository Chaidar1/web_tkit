import bcrypt
from app.database import SessionLocal
from app.models import User

def hash_password(password):
    """Hash password using bcrypt directly"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(plain_password, hashed_password):
    """Verify password using bcrypt directly"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_admin():
    db = SessionLocal()
    
    # Cek apakah admin sudah ada
    existing = db.query(User).filter(User.username == "admin").first()
    if existing:
        print("⚠️ Admin already exists!")
        print(f"Username: {existing.username}")
        print(f"Email: {existing.email}")
        print(f"Is Admin: {existing.is_admin}")
        db.close()
        return
    
    # Buat admin dengan bcrypt langsung
    hashed_password = hash_password("admin123")
    
    admin = User(
        username="admin",
        email="admin@tkarrahman.sch.id",
        hashed_password=hashed_password,
        is_admin=True,
        is_active=True
    )
    
    db.add(admin)
    db.commit()
    db.refresh(admin)
    
    print("=" * 50)
    print("✅ Admin created successfully!")
    print(f"📝 Username: {admin.username}")
    print(f"🔑 Password: admin123")
    print(f"📧 Email: {admin.email}")
    print(f"👑 Role: Admin")
    print("=" * 50)
    
    db.close()

if __name__ == "__main__":
    create_admin()