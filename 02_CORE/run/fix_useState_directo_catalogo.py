# -*- coding: utf-8 -*-
from pathlib import Path
from datetime import datetime
import re

hidro = Path(r"D:\HidroFlow\01_APP\HIDROFLOW\src\HidroFlow.jsx")
backup_dir = Path(r"D:\HIDROFLOW\09_LEGACY\respaldo_c\app_hidroflow")
backup_dir.mkdir(parents=True, exist_ok=True)

fecha = datetime.now().strftime("%Y%m%d_%H%M%S")
backup = backup_dir / f"HidroFlow_PRE_FIX_USESTATE_DIRECTO_{fecha}.jsx"

txt = hidro.read_text(encoding="utf-8")
backup.write_text(txt, encoding="utf-8")

# ------------------------------------------------------------
# 1. Asegurar import del catalogo una sola vez arriba
# ------------------------------------------------------------
txt = re.sub(
    r'(?m)^\s*import\s+\{\s*CUENCA_DEFAULT_ID\s*,\s*getCuencaById\s*\}\s+from\s+["\']\.\/data\/cuencasCatalogo["\'];\s*\n?',
    '',
    txt
)

import_line = 'import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";\n'

m = re.match(r'(?s)((?:import .*\n)+)', txt)
if m:
    txt = txt[:m.end()] + import_line + txt[m.end():]
else:
    txt = import_line + txt

# ------------------------------------------------------------
# 2. Eliminar cualquier const DO global
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
# 3. Reemplazar useState(DO) por carga directa desde catalogo
# ------------------------------------------------------------
txt = re.sub(
    r'const\s*\[\s*params\s*,\s*setParams\s*\]\s*=\s*useState\s*\(\s*DO\s*\)\s*;',
    'const [params, setParams] = useState(() => getCuencaById(CUENCA_DEFAULT_ID));',
    txt,
    count=1
)

# ------------------------------------------------------------
# 4. Asegurar que stn siga siendo estacion IDF valida
# ------------------------------------------------------------
txt = re.sub(
    r'const\s*\[\s*stn\s*,\s*setStn\s*\]\s*=\s*useState\s*\([^;]*\)\s*;',
    'const [stn, setStn] = useState("SAN ANTONIO DE PRADO");',
    txt,
    count=1
)

hidro.write_text(txt, encoding="utf-8")

print("========================================")
print("OK: HidroFlow.jsx blindado sin dependencia de DO")
print("Backup:", backup)
print("Archivo:", hidro)
print("========================================")
print("VALIDACION:")

contenido = hidro.read_text(encoding="utf-8")
for i, line in enumerate(contenido.splitlines(), start=1):
    if "cuencasCatalogo" in line or "const DO" in line or "useState(() => getCuencaById" in line or 'useState("SAN ANTONIO DE PRADO")' in line or "export default function HidroFlow" in line:
        print(f"{i}: {line}")
