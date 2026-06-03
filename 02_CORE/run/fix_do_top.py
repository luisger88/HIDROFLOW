# -*- coding: utf-8 -*-
from pathlib import Path
from datetime import datetime
import re

hidro = Path(r"D:\HidroFlow\01_APP\HIDROFLOW\src\HidroFlow.jsx")
backup_dir = Path(r"D:\HIDROFLOW\09_LEGACY\respaldo_c\app_hidroflow")
backup_dir.mkdir(parents=True, exist_ok=True)

fecha = datetime.now().strftime("%Y%m%d_%H%M%S")
backup = backup_dir / f"HidroFlow_PRE_FIX_DO_TOP_{fecha}.jsx"

txt = hidro.read_text(encoding="utf-8")
backup.write_text(txt, encoding="utf-8")

# ------------------------------------------------------------
# 1. Eliminar cualquier import previo del catalogo
# ------------------------------------------------------------
txt = re.sub(
    r'(?m)^\s*import\s+\{\s*CUENCA_DEFAULT_ID\s*,\s*getCuencaById\s*\}\s+from\s+["\']\.\/data\/cuencasCatalogo["\'];\s*\n?',
    '',
    txt
)

# ------------------------------------------------------------
# 2. Eliminar cualquier const DO previo
#    - DO conectado al catalogo
#    - DO hardcodeado San Antonio en una sola linea
# ------------------------------------------------------------
txt = re.sub(
    r'(?m)^\s*const\s+DO\s*=\s*getCuencaById\s*\(\s*CUENCA_DEFAULT_ID\s*\)\s*;\s*\n?',
    '',
    txt
)

txt = re.sub(
    r'(?m)^\s*const\s+DO\s*=\s*\{\s*nombre_cuenca\s*:\s*"Cuenca San Antonio"[\s\S]*?\};\s*\n?',
    '',
    txt,
    count=1
)

# ------------------------------------------------------------
# 3. Insertar import + const DO justo despues de HidrogramaResultado
# ------------------------------------------------------------
bloque = (
    'import HidrogramaResultado from "./components/HidrogramaResultado";\n'
    'import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";\n\n'
    'const DO = getCuencaById(CUENCA_DEFAULT_ID);\n'
)

patron = r'import\s+HidrogramaResultado\s+from\s+["\']\.\/components\/HidrogramaResultado["\'];'

if re.search(patron, txt):
    txt = re.sub(patron, bloque.rstrip(), txt, count=1)
else:
    # Fallback: insertar al inicio si no encuentra el import esperado
    txt = (
        'import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";\n'
        'const DO = getCuencaById(CUENCA_DEFAULT_ID);\n\n'
        + txt
    )

hidro.write_text(txt, encoding="utf-8")

print("========================================")
print("OK: DO movido arriba y duplicados eliminados")
print("Backup:", backup)
print("Archivo:", hidro)
print("========================================")
print("VALIDACION:")

contenido = hidro.read_text(encoding="utf-8")
for i, line in enumerate(contenido.splitlines(), start=1):
    if "cuencasCatalogo" in line or "const DO" in line or "useState(DO" in line or "export default function HidroFlow" in line:
        print(f"{i}: {line}")
