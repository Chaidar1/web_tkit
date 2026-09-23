# BACKEND/generate_hash.py
import bcrypt
import os
import sys

def generate_hash():
    print("\n" + "="*60)
    print("🔐 GENERATE PASSWORD HASH FOR ADMIN")
    print("="*60)
    
    # Ambil password dari input
    password = input("\nMasukkan password untuk admin: ")
    
    # Konfirmasi password
    confirm = input("Konfirmasi password: ")
    
    if password != confirm:
        print("\n❌ Password tidak cocok! Silakan coba lagi.")
        return
    
    if len(password) < 4:
        print("\n❌ Password minimal 4 karakter!")
        return
    
    # Generate hash
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    hash_string = hashed.decode('utf-8')
    
    print("\n" + "="*60)
    print("✅ HASH BERHASIL DIGENERATE!")
    print("="*60)
    print(f"\n🔑 Password: {password}")
    print(f"🔒 Hash: {hash_string}")
    print("\n" + "="*60)
    
    # Tampilkan cara update
    print("\n📝 CARA UPDATE:")
    print("-"*60)
    print("1. Copy hash di atas")
    print("2. Update di file app/auth.py:")
    print(f"   DEFAULT_PASSWORD_HASH = \"{hash_string}\"")
    print("\n   ATAU")
    print("3. Update di file .env:")
    print(f"   ADMIN_PASSWORD_HASH={hash_string}")
    print("="*60 + "\n")

if __name__ == "__main__":
    try:
        generate_hash()
    except KeyboardInterrupt:
        print("\n\n❌ Dibatalkan oleh user")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("Pastikan bcrypt sudah terinstall:")
        print("  pip install bcrypt")
        sys.exit(1)