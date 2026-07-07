import auditoriasData from "./RegistroAuditorias.json";

export const obtenerAuditoria = (id) => {
  return auditoriasData.auditorias.find(
    a => a.id === id
  ) || null;
};

export const listarAuditorias = () =>
  auditoriasData.auditorias;
