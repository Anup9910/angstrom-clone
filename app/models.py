from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.mysql import MEDIUMTEXT
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)

class MaterialMaster(Base):
    """Material master table mapping to tblitems."""

    __tablename__ = "tblitems"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    commodity_code = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(MEDIUMTEXT, nullable=False)

