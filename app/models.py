from sqlalchemy import Column, Integer, String

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
