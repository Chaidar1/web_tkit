# Website TK - Profil Sekolah Taman Kanak-Kanak

Website profil sekolah Taman Kanak-Kanak berbasis web yang dibangun dengan **FastAPI** (Backend) dan **ReactJS** (Frontend). Proyek ini bertujuan untuk meningkatkan visibilitas digital sekolah dan mempermudah penyampaian informasi kepada orang tua murid.

![Status](https://img.shields.io/badge/status-completed-success)
![Backend](https://img.shields.io/badge/backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/frontend-ReactJS-61DAFB)
![Database](https://img.shields.io/badge/database-MySQL%20%7C%20PostgreSQL-4479A1)

## Tech Stack

- **Backend:** FastAPI, Python, SQLAlchemy
- **Frontend:** ReactJS, Axios, Tailwind CSS
- **Database:** MySQL / PostgreSQL
- **Tools:** Git, Postman, Figma

## Fitur Utama

- Profil sekolah dan visi misi
- Berita dan kegiatan sekolah
- Galeri foto kegiatan
- Informasi PPDB (Penerimaan Peserta Didik Baru)
- Kontak dan lokasi sekolah

## Cara Menjalankan

### Prasyarat
- Python 3.9+
- Node.js 16+
- MySQL / PostgreSQL

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
# Konfigurasi database di file .env
uvicorn main:app --reload
