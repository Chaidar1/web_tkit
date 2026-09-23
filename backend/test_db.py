import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print(f"Connecting to: {DATABASE_URL}")

try:
    conn = psycopg2.connect(DATABASE_URL)
    print("✅ Database connection successful!")
    
    # Test query
    cur = conn.cursor()
    cur.execute("SELECT version();")
    version = cur.fetchone()
    print(f"✅ PostgreSQL Version: {version[0]}")
    
    cur.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    print("\nPastikan:")
    print("1. Password PostgreSQL: root")
    print("2. Database 'tk_it' sudah dibuat")
    print("3. PostgreSQL sedang berjalan")