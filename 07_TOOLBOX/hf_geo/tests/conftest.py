import sys
from pathlib import Path

TOOLBOX = Path(__file__).resolve().parents[1]
if str(TOOLBOX) not in sys.path:
    sys.path.insert(0, str(TOOLBOX))