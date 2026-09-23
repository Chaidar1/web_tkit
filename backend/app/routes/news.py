from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models import News
from app.schemas import NewsCreate, NewsUpdate, NewsResponse
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/news", tags=["news"])

# ============================================================
# PENTING: URUTAN ROUTE SANGAT PENTING!
# Route statis (/tags, /all) HARUS di atas route dinamis (/{news_id})
# ============================================================

# ==================== 1. GET /news/ (PUBLIC) ====================
@router.get("/", response_model=List[NewsResponse])
def get_news(
    db: Session = Depends(get_db),
    search: Optional[str] = Query(None, description="Search by title or content"),
    tag: Optional[str] = Query(None, description="Filter by tag"),
    limit: Optional[int] = Query(None, description="Limit results"),
    offset: Optional[int] = Query(0, description="Offset for pagination")
):
    """Public endpoint untuk mendapatkan berita dengan filter search dan tag"""
    query = db.query(News).filter(News.is_published == True)
    
    if tag:
        query = query.filter(News.tags.ilike(f"%{tag}%"))
    
    if search:
        search_filter = or_(
            News.title.ilike(f"%{search}%"),
            News.content.ilike(f"%{search}%"),
            News.excerpt.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    query = query.order_by(News.created_at.desc())
    
    if limit:
        query = query.limit(limit).offset(offset)
    
    return query.all()


# ==================== 2. GET /news/tags (PUBLIC) ====================
@router.get("/tags")
def get_all_tags(db: Session = Depends(get_db)):
    """Public endpoint untuk mendapatkan semua tags yang tersedia"""
    news_list = db.query(News).filter(
        News.is_published == True, 
        News.tags.isnot(None)
    ).all()
    
    tags_set = set()
    for news in news_list:
        if news.tags:
            for tag in news.tags.split(','):
                tag_clean = tag.strip()
                if tag_clean:
                    tags_set.add(tag_clean)
    
    return {"tags": sorted(list(tags_set))}


# ==================== 3. GET /news/all (ADMIN) ====================
@router.get("/all", response_model=List[NewsResponse])
def get_all_news(
    skip: int = 0, 
    limit: int = 100, 
    current_user = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    """Admin endpoint untuk mendapatkan semua berita"""
    news = db.query(News).order_by(News.created_at.desc()).offset(skip).limit(limit).all()
    return news


# ==================== 4. GET /news/{news_id} (PUBLIC) ====================
@router.get("/{news_id}", response_model=NewsResponse)
def get_news_detail(news_id: int, db: Session = Depends(get_db)):
    """Public endpoint untuk mendapatkan detail berita"""
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    news.view_count = (news.view_count or 0) + 1
    db.commit()
    db.refresh(news)
    
    return news


# ==================== 5. POST /news/ (ADMIN) ====================
@router.post("/", response_model=NewsResponse, status_code=status.HTTP_201_CREATED)
def create_news(
    news: NewsCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk membuat berita baru"""
    now = datetime.now()
    
    news_data = news.model_dump()
    
    db_news = News(
        **news_data,
        date=now,
        created_at=now,
        updated_at=now,
        view_count=0
    )
    
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news


# ==================== 6. PUT /news/{news_id} (ADMIN) ====================
@router.put("/{news_id}", response_model=NewsResponse)
def update_news(
    news_id: int, 
    news: NewsUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk update berita"""
    db_news = db.query(News).filter(News.id == news_id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News not found")
    
    update_data = news.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_news, key, value)
    
    # Pastikan updated_at diisi
    db_news.updated_at = datetime.now()
    
    db.commit()
    db.refresh(db_news)
    return db_news


# ==================== 7. DELETE /news/{news_id} (ADMIN) ====================
@router.delete("/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_news(
    news_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    """Admin endpoint untuk delete berita"""
    db_news = db.query(News).filter(News.id == news_id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News not found")
    
    db.delete(db_news)
    db.commit()
    return None