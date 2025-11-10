"""Material Master Router - API Endpoints"""
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import (
    MaterialMasterCreate,
    MaterialMasterListResponse,
    MaterialMasterRead,
    MaterialMasterUpdate,
)
from app.services.material_master_service import MaterialMasterService

router = APIRouter(prefix="/v1/material-master", tags=["Material Master"])


@router.post("/", response_model=MaterialMasterRead, status_code=status.HTTP_201_CREATED)
def create_material(
    material_data: MaterialMasterCreate,
    db: Session = Depends(get_db),
):
    """Create a new material (tblitems)."""
    return MaterialMasterService.create_material(db, material_data)


@router.get("/", response_model=MaterialMasterListResponse)
def get_materials(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search by commodity code or description"),
    db: Session = Depends(get_db),
):
    """Get paginated materials with optional search."""
    skip = (page - 1) * page_size
    materials, total = MaterialMasterService.get_materials(
        db=db,
        skip=skip,
        limit=page_size,
        search=search,
    )

    total_pages = (total + page_size - 1) // page_size if total > 0 else 0

    return MaterialMasterListResponse(
        items=materials,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


@router.get("/{material_id}", response_model=MaterialMasterRead)
def get_material_by_id(material_id: int, db: Session = Depends(get_db)):
    """Get a material by ID."""
    material = MaterialMasterService.get_material_by_id(db, material_id)
    if not material:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Material with ID {material_id} not found",
        )
    return material


@router.get("/code/{commodity_code}", response_model=MaterialMasterRead)
def get_material_by_code(commodity_code: str, db: Session = Depends(get_db)):
    """Get a material by commodity code."""
    material = MaterialMasterService.get_material_by_code(db, commodity_code)
    if not material:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Material with code '{commodity_code}' not found",
        )
    return material


@router.put("/{material_id}", response_model=MaterialMasterRead)
def update_material(
    material_id: int,
    material_data: MaterialMasterUpdate,
    db: Session = Depends(get_db),
):
    """Update a material."""
    return MaterialMasterService.update_material(db, material_id, material_data)


@router.delete("/{material_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_material(material_id: int, db: Session = Depends(get_db)):
    """Delete a material."""
    MaterialMasterService.delete_material(db, material_id)
    return None

