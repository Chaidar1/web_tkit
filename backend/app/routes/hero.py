from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
from datetime import datetime
from app.database import get_db
from app.models import HeroImage
from app.schemas import HeroImageCreate, HeroImageUpdate, HeroImageResponse
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/hero", tags=["hero"])

# Folder untuk menyimpan gambar hero
UPLOAD_DIR = "uploads/hero"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_upload_file(upload_file: UploadFile) -> str:
    """Simpan file upload dan return path-nya"""
    # Buat nama file unik dengan timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = os.path.splitext(upload_file.filename)[1]
    filename = f"hero_{timestamp}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Simpan file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    return f"/uploads/hero/{filename}"

# ==================== PUBLIC ENDPOINTS ====================

@router.get("/", response_model=List[HeroImageResponse])
def get_hero_images(db: Session = Depends(get_db)):
    """Public endpoint untuk mendapatkan hero images yang aktif"""
    return db.query(HeroImage).filter(HeroImage.is_active == True).order_by(HeroImage.order).all()

# ==================== ADMIN ENDPOINTS ====================

@router.get("/all", response_model=List[HeroImageResponse])
def get_all_hero_images(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk mendapatkan semua hero images"""
    return db.query(HeroImage).order_by(HeroImage.order).all()

@router.get("/{hero_id}", response_model=HeroImageResponse)
def get_hero_image(
    hero_id: int,
    db: Session = Depends(get_db)
):
    """Public endpoint untuk mendapatkan detail hero image"""
    hero = db.query(HeroImage).filter(HeroImage.id == hero_id).first()
    if not hero:
        raise HTTPException(status_code=404, detail="Hero image not found")
    return hero

@router.post("/", response_model=HeroImageResponse, status_code=status.HTTP_201_CREATED)
def create_hero_image(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    link_url: Optional[str] = Form(None),
    link_text: Optional[str] = Form(None),
    order: int = Form(0),
    is_active: bool = Form(True),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk membuat hero image baru dengan upload gambar"""
    
    # Simpan gambar
    image_url = save_upload_file(image)
    
    # Buat data hero
    hero_data = HeroImageCreate(
        title=title,
        description=description,
        image_url=image_url,
        link_url=link_url,
        link_text=link_text,
        order=order,
        is_active=is_active
    )
    
    db_hero = HeroImage(**hero_data.model_dump())
    db.add(db_hero)
    db.commit()
    db.refresh(db_hero)
    return db_hero

@router.put("/{hero_id}", response_model=HeroImageResponse)
def update_hero_image(
    hero_id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    link_url: Optional[str] = Form(None),
    link_text: Optional[str] = Form(None),
    order: Optional[int] = Form(None),
    is_active: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk update hero image dengan upload gambar"""
    
    db_hero = db.query(HeroImage).filter(HeroImage.id == hero_id).first()
    if not db_hero:
        raise HTTPException(status_code=404, detail="Hero image not found")
    
    # Update fields
    if title is not None:
        db_hero.title = title
    if description is not None:
        db_hero.description = description
    if link_url is not None:
        db_hero.link_url = link_url
    if link_text is not None:
        db_hero.link_text = link_text
    if order is not None:
        db_hero.order = order
    if is_active is not None:
        db_hero.is_active = is_active
    
    # Upload gambar baru jika ada
    if image:
        # Hapus gambar lama jika ada
        if db_hero.image_url:
            old_path = db_hero.image_url.lstrip('/')
            if os.path.exists(old_path):
                os.remove(old_path)
        
        # Simpan gambar baru
        db_hero.image_url = save_upload_file(image)
    
    db.commit()
    db.refresh(db_hero)
    return db_hero

@router.post("/upload-image/{hero_id}")
def upload_hero_image(
    hero_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Endpoint khusus untuk upload gambar hero"""
    
    db_hero = db.query(HeroImage).filter(HeroImage.id == hero_id).first()
    if not db_hero:
        raise HTTPException(status_code=404, detail="Hero image not found")
    
    # Hapus gambar lama jika ada
    if db_hero.image_url:
        old_path = db_hero.image_url.lstrip('/')
        if os.path.exists(old_path):
            os.remove(old_path)
    
    # Simpan gambar baru
    image_url = save_upload_file(image)
    db_hero.image_url = image_url
    
    db.commit()
    db.refresh(db_hero)
    return {"message": "Image uploaded successfully", "image_url": image_url}

@router.delete("/{hero_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_hero_image(
    hero_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk delete hero image"""
    db_hero = db.query(HeroImage).filter(HeroImage.id == hero_id).first()
    if not db_hero:
        raise HTTPException(status_code=404, detail="Hero image not found")
    
    # Hapus gambar jika ada
    if db_hero.image_url:
        old_path = db_hero.image_url.lstrip('/')
        if os.path.exists(old_path):
            os.remove(old_path)
    
    db.delete(db_hero)
    db.commit()
    return None