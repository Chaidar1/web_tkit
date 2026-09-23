from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
import os
import shutil
from datetime import datetime
from app.database import get_db
from app.models import Program, News, HeroImage, User
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/admin", tags=["admin"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
def upload_image(
    file: UploadFile = File(...),
    current_user = Depends(get_current_admin)
):
    """Endpoint untuk upload gambar umum oleh admin"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar (JPG, PNG, WebP)")
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = os.path.splitext(file.filename)[1] or ".jpg"
    safe_filename = f"upload_{timestamp}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, safe_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {
        "url": f"/uploads/{safe_filename}",
        "filename": safe_filename,
        "message": "File berhasil diupload"
    }

@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Mendapatkan statistik konten untuk dashboard admin"""
    return {
        "programs_count": db.query(Program).count(),
        "news_count": db.query(News).count(),
        "hero_count": db.query(HeroImage).count(),
        "users_count": db.query(User).count()
    }
