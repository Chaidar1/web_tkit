from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import Contact
from app.schemas import ContactCreate, ContactUpdate, ContactResponse
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/contact", tags=["contact"])

# ==================== GET /contact/ (PUBLIC) ====================
@router.get("/", response_model=Optional[ContactResponse])
def get_contact(db: Session = Depends(get_db)):
    """Public endpoint untuk mendapatkan informasi kontak"""
    contact = db.query(Contact).first()
    
    # Jika belum ada, buat data default untuk TK
    if not contact:
        contact = Contact(
            address="Jl. Pendidikan No. 123, Jakarta Selatan",
            phone="(021) 7654321",
            email="info@tkarrahman.sch.id",
            latitude="-6.2088",
            longitude="106.8456",
            jam_operasional="07:00 - 16:00 WIB",
            jam_operasional_sabtu="08:00 - 12:00 WIB",
            hari_libur="Minggu & Hari Libur Nasional",
            facebook_url="https://facebook.com/tkarrahman",
            instagram_url="https://instagram.com/tkarrahman",
            youtube_url="https://youtube.com/@tkarrahman"
        )
        db.add(contact)
        db.commit()
        db.refresh(contact)
        print("✅ Created default contact for TK IT AR RAHMAN AL IKHLAS")
    
    return contact

# ==================== POST /contact/ (ADMIN) ====================
@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(
    contact: ContactCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk membuat contact baru"""
    existing = db.query(Contact).first()
    if existing:
        raise HTTPException(
            status_code=400, 
            detail="Contact already exists, use PUT to update"
        )
    
    db_contact = Contact(**contact.model_dump())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

# ==================== PUT /contact/{contact_id} (ADMIN) ====================
@router.put("/{contact_id}", response_model=ContactResponse)
def update_contact(
    contact_id: int, 
    contact: ContactUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk update contact"""
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    
    # Auto-create jika belum ada
    if not db_contact:
        db_contact = Contact(id=contact_id)
        db.add(db_contact)
    
    update_data = contact.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_contact, key, value)
    
    db.commit()
    db.refresh(db_contact)
    return db_contact

# ==================== DELETE /contact/{contact_id} (ADMIN) ====================
@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(
    contact_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk delete contact"""
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    db.delete(db_contact)
    db.commit()
    return None