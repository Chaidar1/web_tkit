from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv
from app.database import engine, Base, SessionLocal
from app.models import About, User
from app.routes import (
    auth_router, 
    news_router, 
    programs_router, 
    hero_router, 
    welcome_router,
    about_router,
    contact_router,
    footer_router,      # <-- TAMBAHKAN INI
    admin_router
)
from app.auth_utils import get_password_hash

# Load environment variables
load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)
print("✅ Database tables created/verified")

# ============ SEED DATABASE ============
def seed_database():
    """Seed database with initial data"""
    db = SessionLocal()
    try:
        print("\n📊 Seeding database...")
        
        # Seed About
        if db.query(About).count() == 0:
            about = About(
                title="Tentang TK IT AR RAHMAN AL IKHLAS",
                content="TK IT AR RAHMAN AL IKHLAS adalah lembaga pendidikan anak usia dini yang didirikan dengan tujuan memberikan pendidikan yang berkualitas, menyenangkan, dan berbasis nilai-nilai Islam bagi anak-anak. Kami memiliki tim pengajar yang profesional, berpengalaman, dan berdedikasi tinggi dalam bidang pendidikan anak usia dini.",
                vision="Menjadi lembaga pendidikan anak usia dini yang unggul dalam membentuk generasi yang cerdas, kreatif, berakhlak mulia, dan berpegang teguh pada nilai-nilai Islam.",
                mission="Menyelenggarakan pendidikan yang menyenangkan, kreatif, dan Islami\nMengembangkan potensi anak secara optimal dan seimbang\nMembentuk karakter dan akhlak mulia sejak dini\nBekerja sama dengan orang tua dalam mendidik dan membimbing anak\nMenciptakan lingkungan belajar yang aman, nyaman, dan penuh kasih sayang",
                message_title="Mari Kita Membangun Negeri",
                message_content="Mari kita mulai dari diri sendiri untuk bisa berkontribusi dalam membangun Indonesia menjadi lebih baik dan juga membuat lingkungan yang nyaman dan bahagia untuk anak dan cucu kita di kemudian hari.",
                stat1_label="Tahun Berdiri",
                stat1_value="2020",
                stat2_label="Siswa Aktif",
                stat2_value="200+",
                stat3_label="Program Unggulan",
                stat3_value="15+",
                stat4_label="Tenaga Pengajar",
                stat4_value="30+"
            )
            db.add(about)
            print("  ✅ Seeded About")
        
        # Seed Admin User
        if db.query(User).filter(User.username == "admin").count() == 0:
            admin = User(
                username="admin",
                email="admin@tkarrahman.sch.id",
                hashed_password=get_password_hash("admin123"),
                is_admin=True,
                is_active=True
            )
            db.add(admin)
            print("  ✅ Seeded Admin User")
        
        db.commit()
        print("✅ Database seeding completed successfully!")
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

# ============ RUN SEED ============
seed_database()

# ============ CREATE FASTAPI APP ============
app = FastAPI(
    title="TK IT AR RAHMAN AL IKHLAS API",
    description="Backend API untuk TK IT AR RAHMAN AL IKHLAS",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# ============ CORS CONFIGURATION ============
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

print("="*60)
print("🔐 CORS Configuration:")
print(f"  Allowed origins: {allowed_origins}")
print(f"  Allow credentials: True")
print(f"  Allow methods: GET, POST, PUT, DELETE, OPTIONS, PATCH")
print(f"  Allow headers: *")
print("="*60)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# ============ STATIC FILES ============
uploads_dir = "uploads"
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)
    os.makedirs(os.path.join(uploads_dir, "hero"))
    os.makedirs(os.path.join(uploads_dir, "welcome"))

# Mount static folder untuk akses gambar
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
print(f"📁 Uploads directory: {os.path.abspath('uploads')}")

# ============ ROUTERS ============
# Auth routes (login/register)
app.include_router(auth_router)

# Public routes - TANPA prefix /api
app.include_router(about_router)
app.include_router(news_router)
app.include_router(programs_router)
app.include_router(contact_router)
app.include_router(hero_router)
app.include_router(welcome_router)
app.include_router(footer_router)   # <-- TAMBAHKAN INI

# Admin routes - TANPA prefix /api
app.include_router(admin_router)

# ============ ROOT ENDPOINTS ============
@app.get("/")
def root():
    return {
        "message": "TK IT AR RAHMAN AL IKHLAS API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# ============ STARTUP LOG ============
print("\n" + "="*60)
print("✅ Server is ready!")
print(f"📚 Swagger UI: http://localhost:8000/docs")
print(f"🔐 Admin Login: username=admin, password=admin123")
print("="*60 + "\n")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True,
        log_level="info"
    )