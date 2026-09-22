# -*- coding: utf-8 -*-
"""
spatial_source — OT-HF-SPATIAL-SOURCE-001.

Motor aislado de evaluación de fuentes territoriales externas. Produce el
contrato hf.spatial-source-assessment.v1 y el contraste post-assessment
(TERRITORIAL_CONTRAST_AUDIT) sin modificar el estado del caso.
"""

from .models import (
    MOTOR,
    MOTOR_VERSION,
    OT,
    SCHEMA as SCHEMA_OUT,
    SCHEMA_VERSION,
)

__version__ = MOTOR_VERSION
__all__ = ["MOTOR", "MOTOR_VERSION", "OT", "SCHEMA_OUT", "SCHEMA_VERSION", "__version__"]