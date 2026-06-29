export default function derivarParametrosIDF(
  contextoBase = {}
) {
  return {
    k: contextoBase?.idf?.k ?? null,
    n: contextoBase?.idf?.n ?? null,
    c: contextoBase?.idf?.c ?? null
  };
}
