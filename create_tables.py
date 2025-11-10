"""Script to create database tables"""
from app.database import engine, Base
# Import all models to register them with Base
from app.models import User, MaterialMaster

def create_tables():
    """Create all tables defined in models"""
    print("Creating database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✓ Tables created successfully!")
        print("\nCreated tables:")
        print("  - users")
        print("  - tblitems (Material Master)")
    except Exception as e:
        print(f"✗ Error creating tables: {e}")
        print("\nMake sure:")
        print("  1. MySQL server is running")
        print("  2. Database 'angstrom_erp' exists")
        print("  3. Database credentials in app/database.py are correct")

if __name__ == "__main__":
    create_tables()

