# test_env.py
import os
from dotenv import load_dotenv
import bcrypt

load_dotenv()

print("="*50)
print("VERIFIKASI .ENV")
print("="*50)

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

print(f"✅ ADMIN_USERNAME: {ADMIN_USERNAME}")
print(f"✅ ADMIN_PASSWORD_HASH: {ADMIN_PASSWORD_HASH[:30]}...")
print(f"✅ Hash length: {len(ADMIN_PASSWORD_HASH)}")

# Test verifikasi password
test_password = "admin123"
try:
    result = bcrypt.checkpw(
        test_password.encode('utf-8'),
        ADMIN_PASSWORD_HASH.encode('utf-8')
    )
    print(f"✅ Password verification: {result}")
    if result:
        print("🎉 Login akan berhasil dengan username 'admin' dan password 'admin123'")
except Exception as e:
    print(f"❌ Error: {e}")