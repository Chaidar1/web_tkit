from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Program
from app.schemas import ProgramCreate, ProgramUpdate, ProgramResponse
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/programs", tags=["programs"])

@router.get("/", response_model=List[ProgramResponse])
def get_programs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    programs = db.query(Program).filter(Program.is_active == True).offset(skip).limit(limit).all()
    return programs

@router.get("/all", response_model=List[ProgramResponse])
def get_all_programs(skip: int = 0, limit: int = 100, current_user = Depends(get_current_admin), db: Session = Depends(get_db)):
    programs = db.query(Program).offset(skip).limit(limit).all()
    return programs

@router.get("/{program_id}", response_model=ProgramResponse)
def get_program_detail(program_id: int, db: Session = Depends(get_db)):
    program = db.query(Program).filter(Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return program

@router.post("/", response_model=ProgramResponse, status_code=status.HTTP_201_CREATED)
def create_program(program: ProgramCreate, db: Session = Depends(get_db), current_user = Depends(get_current_admin)):
    db_program = Program(**program.model_dump())
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program

@router.put("/{program_id}", response_model=ProgramResponse)
def update_program(program_id: int, program: ProgramUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_admin)):
    db_program = db.query(Program).filter(Program.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    update_data = program.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_program, key, value)
    
    db.commit()
    db.refresh(db_program)
    return db_program

@router.delete("/{program_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_program(program_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_admin)):
    db_program = db.query(Program).filter(Program.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    db.delete(db_program)
    db.commit()
    return None