from app.database import engine, Base
from app.models import User, News, Program, HeroImage, Welcome, About

print("Creating database tables in tk_it...")
Base.metadata.create_all(bind=engine)
print("✅ Tables created successfully!")
print("\nTables created:")
print("  - users")
print("  - news")
print("  - programs")
print("  - hero_images")
print("  - welcome")
print("  - about")