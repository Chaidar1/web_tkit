from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import About
from app.schemas import AboutCreate, AboutUpdate, AboutResponse
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/about", tags=["about"])

@router.get("/", response_model=Optional[AboutResponse])
def get_about(db: Session = Depends(get_db)):
    """Public endpoint untuk mendapatkan informasi profil / tentang kami"""
    about = db.query(About).first()
    return about

@router.post("/", response_model=AboutResponse, status_code=status.HTTP_201_CREATED)
def create_about(about: AboutCreate, db: Session = Depends(get_db), current_user = Depends(get_current_admin)):
    """Admin endpoint untuk membuat about baru"""
    # Cek apakah sudah ada
    existing = db.query(About).first()
    if existing:
        raise HTTPException(status_code=400, detail="About already exists, use PUT to update")
    
    db_about = About(**about.model_dump())
    db.add(db_about)
    db.commit()
    db.refresh(db_about)
    return db_about

@router.put("/{about_id}", response_model=AboutResponse)
def update_about(
    about_id: int, 
    about: AboutUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk update about"""
    db_about = db.query(About).filter(About.id == about_id).first()
    if not db_about:
        # Jika tidak ada, buat baru dengan ID yang diberikan
        db_about = About(id=about_id)
        db.add(db_about)
    
    update_data = about.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_about, key, value)
    
    db.commit()
    db.refresh(db_about)
    return db_about

@router.delete("/{about_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_about(
    about_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk delete about"""
    db_about = db.query(About).filter(About.id == about_id).first()
    if not db_about:
        raise HTTPException(status_code=404, detail="About not found")
    
    db.delete(db_about)
    db.commit()
    return None