from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


DATABASE_USER = "root"
DATABASE_PASSWORD = ""
DATABASE_HOST = "localhost"
DATABASE_NAME = "angstrom_erp"

_auth_part = f"{DATABASE_USER}:{DATABASE_PASSWORD}" if DATABASE_PASSWORD else DATABASE_USER
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{_auth_part}@{DATABASE_HOST}/{DATABASE_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
