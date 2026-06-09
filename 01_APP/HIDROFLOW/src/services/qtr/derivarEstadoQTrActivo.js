// Adaptador puro Q-Tr activo.
// No calcula caudales.
// No modifica Q-5.
// No toca hidroEngine ni tcSelector.

const CAMPOS_MINIMOS_QTR_ACTIVO = [
  'tr_activo',
  'estacion_idf',
  'metodo_idf',
  'distribucion_temporal',
  'area_km2',
  'cn_efectivo',
  's_mm',
  'ia_mm',
  'porcentaje_impermeable',
  'tc_min',
  'lluvia_efectiva_total_mm'
];

function tieneValorOperativo(valor) {
  if (valor === null || valor === undefined) return false;
  if (typeof valor === 'number') return Number.isFinite(valor);
  if (typeof valor === 'string') return valor.trim().length > 0 && valor.trim() !== '—';
  if (Array.isArray(valor)) return valor.length > 0;
  if (typeof valor === 'object') return Object.keys(valor).length > 0;
  return Boolean(valor);
}

export function derivarEstadoQTrActivo(contexto = {}) {
  const fuente = contexto ?? {};

  const qtrBase = {
    tr_activo: fuente.tr_diseno_activo ?? fuente.Tr_activo ?? null,
    estacion_idf: fuente.estacion_idf ?? null,
    metodo_idf: fuente.metodoIDF ?? fuente.metodo_idf ?? null,
    distribucion_temporal: fuente.distribucionTemporal ?? fuente.distribucion_temporal ?? null,
    area_km2: fuente.area_km2 ?? null,
    cn_base: fuente.CN_base ?? fuente.cn_base ?? fuente.CN ?? null,
    cn_efectivo: fuente.CN_efectivo ?? fuente.cn_efectivo ?? fuente.CN ?? null,
    amc: fuente.AMC ?? fuente.amc ?? null,
    s_mm: fuente.S_mm ?? fuente.s_mm ?? null,
    ia_mm: fuente.Ia_mm ?? fuente.ia_mm ?? null,
    porcentaje_impermeable: fuente.porcentaje_impermeable ?? fuente.porcentajeImpermeable ?? null,
    tc_min: fuente.tc_sugerido_min ?? fuente.tc_min ?? fuente.tc ?? null,
    lluvia_efectiva_total_mm: fuente.lluvia_efectiva_total_mm ?? null
  };

  const camposFaltantes = CAMPOS_MINIMOS_QTR_ACTIVO.filter((campo) => {
    return !tieneValorOperativo(qtrBase[campo]);
  });

  const disponible = camposFaltantes.length === 0;

  return {
    fuente: 'derivarEstadoQTrActivo',
    tipo: 'escenario_tr_activo',
    estado: disponible ? 'disponible' : 'incompleto',
    disponible,
    campos_faltantes: camposFaltantes,
    q_tr_activo: qtrBase
  };
}

export { CAMPOS_MINIMOS_QTR_ACTIVO };
