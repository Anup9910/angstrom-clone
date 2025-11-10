"""Material Master Service Layer - Business Logic"""
from typing import Optional, Tuple

from fastapi import HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models import MaterialMaster
from app.schemas import MaterialMasterCreate, MaterialMasterUpdate


class MaterialMasterService:
    """Service class for Material Master (tblitems) operations."""

    @staticmethod
    def create_material(db: Session, material_data: MaterialMasterCreate) -> MaterialMaster:
        """Create a new material record."""
        existing = (
            db.query(MaterialMaster)
            .filter(MaterialMaster.commodity_code == material_data.commodity_code)
            .first()
        )
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Material with code '{material_data.commodity_code}' already exists",
            )

        db_material = MaterialMaster(**material_data.model_dump())
        db.add(db_material)
        db.commit()
        db.refresh(db_material)
        return db_material

    @staticmethod
    def get_material_by_id(db: Session, material_id: int) -> Optional[MaterialMaster]:
        """Return a material by its primary key."""
        return db.query(MaterialMaster).filter(MaterialMaster.id == material_id).first()

    @staticmethod
    def get_material_by_code(db: Session, commodity_code: str) -> Optional[MaterialMaster]:
        """Return a material by its commodity code."""
        return (
            db.query(MaterialMaster)
            .filter(MaterialMaster.commodity_code == commodity_code)
            .first()
        )

    @staticmethod
    def get_materials(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        search: Optional[str] = None,
    ) -> Tuple[list[MaterialMaster], int]:
        """Return paginated materials with optional search."""
        try:
            query = db.query(MaterialMaster)

            if search:
                term = f"%{search}%"
                query = query.filter(
                    or_(
                        MaterialMaster.commodity_code.like(term),
                        MaterialMaster.description.like(term),
                    )
                )

            total = query.count()
            materials = query.order_by(MaterialMaster.id.desc()).offset(skip).limit(limit).all()
            return materials, total
        except Exception as exc:  # pragma: no cover - defensive guard
            error_msg = str(exc).lower()
            if "table" in error_msg and ("doesn't exist" in error_msg or "does not exist" in error_msg):
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Table 'tblitems' does not exist. Please create the table first using create_tables.py",
                )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {exc}",
            )

    @staticmethod
    def update_material(
        db: Session, material_id: int, material_data: MaterialMasterUpdate
    ) -> MaterialMaster:
        """Update an existing material."""
        db_material = MaterialMasterService.get_material_by_id(db, material_id)
        if not db_material:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Material with ID {material_id} not found",
            )

        update_data = material_data.model_dump(exclude_unset=True)
        if "commodity_code" in update_data:
            duplicate = (
                db.query(MaterialMaster)
                .filter(
                    MaterialMaster.commodity_code == update_data["commodity_code"],
                    MaterialMaster.id != material_id,
                )
                .first()
            )
            if duplicate:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Material with code '{update_data['commodity_code']}' already exists",
                )

        for field, value in update_data.items():
            setattr(db_material, field, value)

        db.commit()
        db.refresh(db_material)
        return db_material

    @staticmethod
    def delete_material(db: Session, material_id: int) -> None:
        """Permanently delete a material."""
        db_material = MaterialMasterService.get_material_by_id(db, material_id)
        if not db_material:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Material with ID {material_id} not found",
            )

        db.delete(db_material)
        db.commit()

