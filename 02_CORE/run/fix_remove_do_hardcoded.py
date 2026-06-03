# -*- coding: utf-8 -*-
from pathlib import Path
from datetime import datetime
import re

hidro = Path(r"D:\HidroFlow\01_APP\HIDROFLOW\src\HidroFlow.jsx")
backup_dir = Path(r"D:\HIDROFLOW\09_LEGACY\respaldo_c\app_hidroflow")
backup_dir.mkdir(parents=True, exist_ok=True)

fecha = datetime.now().strftime("%Y%m%d_%H%M%S")
backup = backup_dir / f"HidroFlow_PRE_REMOVE_DO_HARDCODED_{fecha}.jsx"

txt = hidro.read_text(encoding="utf-8")
backup.write_text(txt, encoding="utf-8")

# Eliminar especificamente el DO hardcodeado de San Antonio, incluso si esta comprimido en una sola linea.
patron_san_antonio = r'(?m)^\s*const\s+DO\s*=\s*\{\s*nombre_cuenca\s*:\s*"Cuenca San Antonio"[\s\S]*?\};\s*\r?\n?'

nuevo, n = re.subn(patron_san_antonio, '', txt, count=1)

if n == 0:
    print("ADVERTENCIA: no se encontro DO hardcodeado de San Antonio.")
else:
    hidro.write_text(nuevo, encoding="utf-8")
    print("OK: DO hardcodeado de San Antonio eliminado.")

print("Backup:", backup)

# Validacion
contenido = hidro.read_text(encoding="utf-8")
for i, line in enumerate(contenido.splitlines(), start=1):
    if "const DO" in line or "cuencasCatalogo" in line or "useState(DO" in line:
        print(f"{i}: {line}")
