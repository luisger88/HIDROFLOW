# -*- coding: utf-8 -*-
from pathlib import Path
from datetime import datetime
import re

hidro = Path(r"D:\HidroFlow\01_APP\HIDROFLOW\src\HidroFlow.jsx")
backup_dir = Path(r"D:\HIDROFLOW\09_LEGACY\respaldo_c\app_hidroflow")
backup_dir.mkdir(parents=True, exist_ok=True)

fecha = datetime.now().strftime("%Y%m%d_%H%M%S")
backup = backup_dir / f"HidroFlow_PRE_FIX_DO_CATALOGO_{fecha}.jsx"

txt = hidro.read_text(encoding="utf-8")
backup.write_text(txt, encoding="utf-8")

# ------------------------------------------------------------
# 1. Eliminar imports duplicados del catalogo
# ------------------------------------------------------------
txt = re.sub(
    r'(?m)^\s*import\s+\{\s*CUENCA_DEFAULT_ID\s*,\s*getCuencaById\s*\}\s+from\s+["\']\.\/data\/cuencasCatalogo["\'];\s*\n?',
    '',
    txt
)

# ------------------------------------------------------------
# 2. Insertar import del catalogo junto a imports superiores
# ------------------------------------------------------------
import_line = 'import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";\n'

m = re.match(r'(?s)((?:import .*\n)+)', txt)

if m:
    txt = txt[:m.end()] + import_line + txt[m.end():]
else:
    txt = import_line + txt

# ------------------------------------------------------------
# 3. Eliminar cualquier DO previo conectado al catalogo
# ------------------------------------------------------------
txt = re.sub(
    r'(?m)^\s*const\s+DO\s*=\s*getCuencaById\s*\(\s*CUENCA_DEFAULT_ID\s*\)\s*;\s*\n?',
    '',
    txt
)

# ------------------------------------------------------------
# 4. Reemplazar DO hardcodeado antes de const TABS
# ------------------------------------------------------------
patron = r'const\s+DO\s*=\s*\{[\s\S]*?\};\s*(?=const\s+TABS\s*=)'

if re.search(patron, txt):
    txt = re.sub(
        patron,
        'const DO = getCuencaById(CUENCA_DEFAULT_ID);\n\n',
        txt,
        count=1
    )
else:
    # Si no existe DO hardcodeado, insertar DO antes de const TABS
    txt = re.sub(
        r'(?m)^const\s+TABS\s*=',
        'const DO = getCuencaById(CUENCA_DEFAULT_ID);\n\nconst TABS=',
        txt,
        count=1
    )

hidro.write_text(txt, encoding="utf-8")

print("========================================")
print("OK: DO conectado definitivamente al catalogo")
print("Backup:", backup)
print("Archivo:", hidro)
print("========================================")
