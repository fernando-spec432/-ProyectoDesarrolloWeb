-- ==========================================
-- SCRIPT PARA CAMBIAR O RESTABLECER LA CONTRASEÑA DEL ADMINISTRADOR
-- Motor: PostgreSQL
-- Proyecto: Sistema de Gestión de Supermercado
-- ==========================================

-- Opción 1: Actualizar la contraseña con Hashing Criptográfico SHA-256 (Recomendado)
-- Contraseña en texto plano: AdminSuper@2026!
UPDATE usuarios 
SET password = '89bd6648727c137099f5732ce69216d7855e6a15d720e5840e31a955ee116ad4'
WHERE username = 'admin';

-- Opción 2: Si deseas cambiarla a otra clave en texto plano personalizada,
-- ejecuta la siguiente línea sustituyendo 'TuNuevaClave123!':
-- UPDATE usuarios SET password = 'TuNuevaClave123!' WHERE username = 'admin';
