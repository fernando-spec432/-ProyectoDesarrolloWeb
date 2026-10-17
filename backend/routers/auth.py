from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import hashlib
from database import get_db
import models
import schemas

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])

def hash_password(password: str) -> str:
    """Genera un hash SHA-256 seguro para almacenar y comparar contraseñas."""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

@router.post("/login", response_model=schemas.LoginResponse)
def login(credentials: schemas.LoginRequest, db: Session = Depends(get_db)):
    """
    **Endpoint de Autenticación de Usuarios (Login Seguro)**:
    Valida credenciales contra la tabla de usuarios en Supabase (PostgreSQL)
    utilizando hashing SHA-256 para mayor seguridad.
    """
    username_clean = credentials.username.strip()
    input_password_hash = hash_password(credentials.password)

    user = db.query(models.Usuario).filter(models.Usuario.username == username_clean).first()

    # Soporte para la contraseña original plana o en formato hash
    if user:
        is_valid = (user.password == input_password_hash) or (user.password == credentials.password)
    else:
        is_valid = False

    if not user or not is_valid:
        return schemas.LoginResponse(
            success=False,
            message="Usuario o contraseña incorrectos."
        )

    if user.estado != "ACTIVO":
        return schemas.LoginResponse(
            success=False,
            message="Su cuenta de usuario se encuentra inactiva."
        )

    # Si la clave en BD estaba en texto plano, actualizar automáticamente al hash seguro
    if user.password != input_password_hash:
        user.password = input_password_hash
        try:
            db.commit()
        except Exception:
            db.rollback()

    return schemas.LoginResponse(
        success=True,
        message="Inicio de sesión exitoso",
        user=schemas.UsuarioResponse.model_validate(user),
        token=f"secure-session-{user.id}-{hash_password(user.username)[:16]}"
    )

@router.patch("/change-password")
def change_password(req: schemas.ChangePasswordRequest, db: Session = Depends(get_db)):
    """
    **Endpoint para Cambiar la Contraseña de Usuario**:
    Permite modificar la contraseña de forma segura actualizando el hash criptográfico SHA-256.
    """
    user = db.query(models.Usuario).filter(models.Usuario.username == req.username.strip()).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    current_hash = hash_password(req.current_password)
    if user.password != current_hash and user.password != req.current_password:
        raise HTTPException(status_code=400, detail="La contraseña actual es incorrecta")

    user.password = hash_password(req.new_password)
    db.commit()
    return {"success": True, "message": "Contraseña actualizada exitosamente con hash criptográfico SHA-256."}
