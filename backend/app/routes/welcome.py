from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
from datetime import datetime
from app.database import get_db
from app.models import Welcome
from app.schemas import WelcomeCreate, WelcomeUpdate, WelcomeResponse
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/welcome", tags=["welcome"])

# Folder untuk menyimpan gambar
UPLOAD_DIR = "uploads/welcome"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_upload_file(upload_file: UploadFile) -> str:
    """Simpan file upload dan return path-nya"""
    # Buat nama file unik dengan timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = os.path.splitext(upload_file.filename)[1]
    filename = f"welcome_{timestamp}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Simpan file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    return f"/uploads/welcome/{filename}"

# Public endpoint
@router.get("/", response_model=Optional[WelcomeResponse])
def get_welcome(db: Session = Depends(get_db)):
    """Public endpoint untuk mendapatkan welcome section yang aktif"""
    welcome = db.query(Welcome).filter(Welcome.is_active == True).first()
    return welcome

# Admin endpoints
@router.get("/all", response_model=List[WelcomeResponse])
def get_all_welcome(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    return db.query(Welcome).all()

@router.post("/", response_model=WelcomeResponse, status_code=status.HTTP_201_CREATED)
def create_welcome(
    title: str = Form(...),
    content: str = Form(...),
    name: Optional[str] = Form(None),
    position: Optional[str] = Form(None),
    is_active: bool = Form(True),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk membuat welcome section baru dengan upload gambar"""
    
    # Proses upload gambar jika ada
    image_url = None
    if image:
        image_url = save_upload_file(image)
    
    # Buat data welcome
    welcome_data = WelcomeCreate(
        title=title,
        content=content,
        image_url=image_url,
        name=name,
        position=position,
        is_active=is_active
    )
    
    db_welcome = Welcome(**welcome_data.model_dump())
    db.add(db_welcome)
    db.commit()
    db.refresh(db_welcome)
    return db_welcome

@router.put("/{welcome_id}", response_model=WelcomeResponse)
def update_welcome(
    welcome_id: int,
    title: Optional[str] = Form(None),
    content: Optional[str] = Form(None),
    name: Optional[str] = Form(None),
    position: Optional[str] = Form(None),
    is_active: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk update welcome section dengan upload gambar"""
    
    db_welcome = db.query(Welcome).filter(Welcome.id == welcome_id).first()
    if not db_welcome:
        raise HTTPException(status_code=404, detail="Welcome section not found")
    
    # Update fields
    if title is not None:
        db_welcome.title = title
    if content is not None:
        db_welcome.content = content
    if name is not None:
        db_welcome.name = name
    if position is not None:
        db_welcome.position = position
    if is_active is not None:
        db_welcome.is_active = is_active
    
    # Upload gambar baru jika ada
    if image:
        # Hapus gambar lama jika ada
        if db_welcome.image_url:
            old_path = db_welcome.image_url.lstrip('/')
            if os.path.exists(old_path):
                os.remove(old_path)
        
        # Simpan gambar baru
        db_welcome.image_url = save_upload_file(image)
    
    db.commit()
    db.refresh(db_welcome)
    return db_welcome

@router.post("/upload-image/{welcome_id}")
def upload_welcome_image(
    welcome_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    """Endpoint khusus untuk upload gambar welcome"""
    
    db_welcome = db.query(Welcome).filter(Welcome.id == welcome_id).first()
    if not db_welcome:
        raise HTTPException(status_code=404, detail="Welcome section not found")
    
    # Hapus gambar lama jika ada
    if db_welcome.image_url:
        old_path = db_welcome.image_url.lstrip('/')
        if os.path.exists(old_path):
            os.remove(old_path)
    
    # Simpan gambar baru
    image_url = save_upload_file(image)
    db_welcome.image_url = image_url
    
    db.commit()
    db.refresh(db_welcome)
    return {"message": "Image uploaded successfully", "image_url": image_url}

@router.delete("/{welcome_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_welcome(
    welcome_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    db_welcome = db.query(Welcome).filter(Welcome.id == welcome_id).first()
    if not db_welcome:
        raise HTTPException(status_code=404, detail="Welcome section not found")
    
    # Hapus gambar jika ada
    if db_welcome.image_url:
        old_path = db_welcome.image_url.lstrip('/')
        if os.path.exists(old_path):
            os.remove(old_path)
    
    db.delete(db_welcome)
    db.commit()
    return None