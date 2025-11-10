from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(..., min_length=1, description="Password will be automatically truncated if too long")


class UserLogin(BaseModel):
    username: str
    password: str


class UserRead(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True  # Pydantic v2 (replaces orm_mode)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ItemRead(BaseModel):
    id: int
    description: str
    commodity_code: str

    class Config:
        from_attributes = True  # Pydantic v2 (replaces orm_mode)


# Material Master Schemas
class MaterialMasterBase(BaseModel):
    """Base schema for Material Master"""

    commodity_code: str = Field(..., min_length=1, max_length=100, description="Unique commodity code")
    description: str = Field(..., min_length=1, description="Material description")


class MaterialMasterCreate(MaterialMasterBase):
    """Schema for creating a new material"""
    pass


class MaterialMasterUpdate(BaseModel):
    """Schema for updating material (all fields optional)"""

    commodity_code: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, min_length=1)


class MaterialMasterRead(MaterialMasterBase):
    """Schema for reading material data"""
    id: int

    class Config:
        from_attributes = True  # Pydantic v2 (replaces orm_mode)


class MaterialMasterListResponse(BaseModel):
    """Schema for paginated material list response"""
    items: list[MaterialMasterRead]
    total: int
    page: int
    page_size: int
    total_pages: int

    class Config:
        from_attributes = True 
