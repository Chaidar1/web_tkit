from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

# ==================== USER MODEL ====================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# ==================== ABOUT MODEL ====================
class About(Base):
    __tablename__ = "about"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, default="Tentang TK IT AR RAHMAN AL IKHLAS")
    content = Column(Text, nullable=False, default="")
    vision = Column(Text, nullable=True)
    mission = Column(Text, nullable=True)
    # Message Card (Mari Kita Membangun Negeri)
    message_title = Column(String(255), nullable=True, default="Mari Kita Membangun Negeri")
    message_content = Column(Text, nullable=True, default="Mari kita mulai dari diri sendiri untuk bisa berkontribusi dalam membangun Indonesia menjadi lebih baik dan juga membuat lingkungan yang nyaman dan bahagia untuk anak dan cucu kita di kemudian hari.")
    # Statistik - 4 field fleksibel
    stat1_label = Column(String(100), nullable=True, default="Tahun Berdiri")
    stat1_value = Column(String(50), nullable=True, default="2020")
    stat2_label = Column(String(100), nullable=True, default="Siswa Aktif")
    stat2_value = Column(String(50), nullable=True, default="200+")
    stat3_label = Column(String(100), nullable=True, default="Program Unggulan")
    stat3_value = Column(String(50), nullable=True, default="15+")
    stat4_label = Column(String(100), nullable=True, default="Tenaga Pengajar")
    stat4_value = Column(String(50), nullable=True, default="30+")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

# ==================== PROGRAM MODEL ====================
class Program(Base):
    __tablename__ = "programs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(100), nullable=True)
    image_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    # Field tambahan untuk TK
    kepala_sekolah = Column(String(255), nullable=True)
    akreditasi = Column(String(50), nullable=True)
    jumlah_siswa = Column(String(50), nullable=True)
    jumlah_guru = Column(String(50), nullable=True)
    tahun_berdiri = Column(String(20), nullable=True)
    jam_belajar = Column(String(100), nullable=True)
    hari_operasional = Column(String(200), nullable=True)
    hari_operasional_sabtu = Column(String(100), nullable=True)
    hari_libur = Column(String(200), nullable=True)
    alamat = Column(Text, nullable=True)
    telepon = Column(String(50), nullable=True)
    email = Column(String(100), nullable=True)
    website = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# ==================== NEWS MODEL ====================
class News(Base):
    __tablename__ = "news"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=True)
    hero_image = Column(String(500), nullable=True)
    content = Column(Text, nullable=False)
    excerpt = Column(String(500), nullable=True)
    author = Column(String(100), nullable=True, default="Admin TK IT AR RAHMAN AL IKHLAS")
    date = Column(DateTime(timezone=True), server_default=func.now())
    location = Column(String(255), nullable=True)
    tags = Column(String(500), nullable=True)
    view_count = Column(Integer, default=0)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

# ==================== CONTACT MODEL ====================
class Contact(Base):
    __tablename__ = "contact"
    
    id = Column(Integer, primary_key=True, index=True)
    address = Column(Text, nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False)
    map_url = Column(String(500), nullable=True)
    latitude = Column(String(50), nullable=True)
    longitude = Column(String(50), nullable=True)
    # Jam operasional
    jam_operasional = Column(String(200), nullable=True)
    jam_operasional_sabtu = Column(String(200), nullable=True)
    hari_libur = Column(String(200), nullable=True)
    # Social media
    facebook_url = Column(String(255), nullable=True)
    instagram_url = Column(String(255), nullable=True)
    youtube_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# ==================== FOOTER MODEL ====================
class Footer(Base):
    __tablename__ = "footer"
    
    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text, nullable=True)
    copyright_text = Column(String(255), nullable=True)
    facebook_url = Column(String(255), nullable=True)
    instagram_url = Column(String(255), nullable=True)
    youtube_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# ==================== HERO IMAGE MODEL ====================
class HeroImage(Base):
    __tablename__ = "hero_images"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=False)
    link_url = Column(String(500), nullable=True)
    link_text = Column(String(100), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

# ==================== WELCOME MODEL ====================
class Welcome(Base):
    __tablename__ = "welcome"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, default="Sambutan Kepala Sekolah")
    content = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=True)
    name = Column(String(255), nullable=True, default="Kepala Sekolah")
    position = Column(String(255), nullable=True, default="Kepala TK IT AR RAHMAN AL IKHLAS")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())