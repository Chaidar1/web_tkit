# test_login.py
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

# Ambil hash dari environment
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")
print(f"Hash dari .env: {ADMIN_PASSWORD_HASH[:30]}...")

# Test password
password = "admin123"
print(f"Testing password: {password}")

try:
    # Coba verifikasi
    result = bcrypt.checkpw(
        password.encode('utf-8'), 
        ADMIN_PASSWORD_HASH.encode('utf-8')
    )
    print(f"✅ Password match: {result}")
except Exception as e:
    print(f"❌ Error: {e}")
    
# Generate hash baru untuk test
new_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
print(f"\nHash baru untuk password '{password}':")
print(new_hash.decode('utf-8'))