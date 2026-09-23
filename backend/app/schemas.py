from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# ==================== USER SCHEMAS ====================
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# ==================== ABOUT SCHEMAS ====================
class AboutBase(BaseModel):
    title: str = "Tentang TK IT AR RAHMAN AL IKHLAS"
    content: str = ""
    vision: Optional[str] = None
    mission: Optional[str] = None
    message_title: Optional[str] = "Mari Kita Membangun Negeri"
    message_content: Optional[str] = "Mari kita mulai dari diri sendiri untuk bisa berkontribusi dalam membangun Indonesia menjadi lebih baik dan juga membuat lingkungan yang nyaman dan bahagia untuk anak dan cucu kita di kemudian hari."
    stat1_label: Optional[str] = "Tahun Berdiri"
    stat1_value: Optional[str] = "2020"
    stat2_label: Optional[str] = "Siswa Aktif"
    stat2_value: Optional[str] = "200+"
    stat3_label: Optional[str] = "Program Unggulan"
    stat3_value: Optional[str] = "15+"
    stat4_label: Optional[str] = "Tenaga Pengajar"
    stat4_value: Optional[str] = "30+"

class AboutCreate(AboutBase):
    pass

class AboutUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    vision: Optional[str] = None
    mission: Optional[str] = None
    message_title: Optional[str] = None
    message_content: Optional[str] = None
    stat1_label: Optional[str] = None
    stat1_value: Optional[str] = None
    stat2_label: Optional[str] = None
    stat2_value: Optional[str] = None
    stat3_label: Optional[str] = None
    stat3_value: Optional[str] = None
    stat4_label: Optional[str] = None
    stat4_value: Optional[str] = None

class AboutResponse(AboutBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# ==================== PROGRAM SCHEMAS ====================
class ProgramBase(BaseModel):
    title: str
    description: str
    icon: Optional[str] = None
    image_url: Optional[str] = None
    order: int = 0
    is_active: bool = True
    kepala_sekolah: Optional[str] = None
    akreditasi: Optional[str] = None
    jumlah_siswa: Optional[str] = None
    jumlah_guru: Optional[str] = None
    tahun_berdiri: Optional[str] = None
    jam_belajar: Optional[str] = None
    hari_operasional: Optional[str] = None
    hari_operasional_sabtu: Optional[str] = None
    hari_libur: Optional[str] = None
    alamat: Optional[str] = None
    telepon: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None

class ProgramCreate(ProgramBase):
    pass

class ProgramUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    image_url: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None
    kepala_sekolah: Optional[str] = None
    akreditasi: Optional[str] = None
    jumlah_siswa: Optional[str] = None
    jumlah_guru: Optional[str] = None
    tahun_berdiri: Optional[str] = None
    jam_belajar: Optional[str] = None
    hari_operasional: Optional[str] = None
    hari_operasional_sabtu: Optional[str] = None
    hari_libur: Optional[str] = None
    alamat: Optional[str] = None
    telepon: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None

class ProgramResponse(ProgramBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# ==================== NEWS SCHEMAS ====================
class NewsBase(BaseModel):
    title: str
    slug: Optional[str] = None
    hero_image: Optional[str] = None
    content: str
    excerpt: Optional[str] = None
    author: Optional[str] = "Admin TK IT AR RAHMAN AL IKHLAS"
    location: Optional[str] = None
    tags: Optional[str] = None
    is_published: bool = True

class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    hero_image: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    author: Optional[str] = None
    location: Optional[str] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None

class NewsResponse(NewsBase):
    id: int
    date: datetime
    view_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# ==================== CONTACT SCHEMAS ====================
class ContactBase(BaseModel):
    address: str
    phone: str
    email: str
    map_url: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    jam_operasional: Optional[str] = None
    jam_operasional_sabtu: Optional[str] = None
    hari_libur: Optional[str] = None
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    map_url: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    jam_operasional: Optional[str] = None
    jam_operasional_sabtu: Optional[str] = None
    hari_libur: Optional[str] = None
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None

class ContactResponse(ContactBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# ==================== FOOTER SCHEMAS ====================
class FooterBase(BaseModel):
    description: Optional[str] = None
    copyright_text: Optional[str] = None
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None

class FooterCreate(FooterBase):
    pass

class FooterUpdate(BaseModel):
    description: Optional[str] = None
    copyright_text: Optional[str] = None
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None

class FooterResponse(FooterBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# ==================== HERO IMAGE SCHEMAS ====================
class HeroImageBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: str
    link_url: Optional[str] = None
    link_text: Optional[str] = None
    order: int = 0
    is_active: bool = True

class HeroImageCreate(HeroImageBase):
    pass

class HeroImageUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    link_text: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None

class HeroImageResponse(HeroImageBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# ==================== WELCOME SCHEMAS ====================
class WelcomeBase(BaseModel):
    title: str = "Sambutan Kepala Sekolah"
    content: str
    image_url: Optional[str] = None
    name: Optional[str] = "Kepala Sekolah"
    position: Optional[str] = "Kepala TK IT AR RAHMAN AL IKHLAS"
    is_active: bool = True

class WelcomeCreate(WelcomeBase):
    pass

class WelcomeUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    name: Optional[str] = None
    position: Optional[str] = None
    is_active: Optional[bool] = None

class WelcomeResponse(WelcomeBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# ==================== LOGIN SCHEMAS ====================
class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    username: str