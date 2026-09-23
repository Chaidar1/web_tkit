from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import Footer
from app.schemas import FooterCreate, FooterUpdate, FooterResponse
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/footer", tags=["footer"])

# ==================== GET /footer/ (PUBLIC) ====================
@router.get("/", response_model=Optional[FooterResponse])
def get_footer(db: Session = Depends(get_db)):
    """Public endpoint untuk mendapatkan informasi footer"""
    footer = db.query(Footer).first()
    
    # Jika belum ada, buat data default untuk TK
    if not footer:
        footer = Footer(
            description="Membina generasi qur'ani yang cerdas, ceria, mandiri, dan berakhlak mulia sejak usia dini.",
            copyright_text="TK IT AR RAHMAN AL IKHLAS",
            facebook_url="https://facebook.com/tkarrahman",
            instagram_url="https://instagram.com/tkarrahman",
            youtube_url="https://youtube.com/@tkarrahman"
        )
        db.add(footer)
        db.commit()
        db.refresh(footer)
        print("✅ Created default footer for TK IT AR RAHMAN AL IKHLAS")
    
    return footer

# ==================== POST /footer/ (ADMIN) ====================
@router.post("/", response_model=FooterResponse, status_code=status.HTTP_201_CREATED)
def create_footer(
    footer: FooterCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk membuat footer baru"""
    existing = db.query(Footer).first()
    if existing:
        raise HTTPException(
            status_code=400, 
            detail="Footer already exists, use PUT to update"
        )
    
    db_footer = Footer(**footer.model_dump())
    db.add(db_footer)
    db.commit()
    db.refresh(db_footer)
    return db_footer

# ==================== PUT /footer/{footer_id} (ADMIN) ====================
@router.put("/{footer_id}", response_model=FooterResponse)
def update_footer(
    footer_id: int, 
    footer: FooterUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk update footer"""
    db_footer = db.query(Footer).filter(Footer.id == footer_id).first()
    
    # Auto-create jika belum ada
    if not db_footer:
        db_footer = Footer(id=footer_id)
        db.add(db_footer)
    
    update_data = footer.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_footer, key, value)
    
    db.commit()
    db.refresh(db_footer)
    return db_footer

# ==================== DELETE /footer/{footer_id} (ADMIN) ====================
@router.delete("/{footer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_footer(
    footer_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk delete footer"""
    db_footer = db.query(Footer).filter(Footer.id == footer_id).first()
    if not db_footer:
        raise HTTPException(status_code=404, detail="Footer not found")
    
    db.delete(db_footer)
    db.commit()
    return None