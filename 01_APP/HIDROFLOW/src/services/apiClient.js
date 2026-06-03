
export async function apiGet(path, params){
  const base = import.meta.env.VITE_API_BASE || '/api/'
  const url = new URL(path, base)
  if(params) Object.entries(params).forEach(([k,v])=>url.searchParams.set(k,v))
  const r = await fetch(url.toString())
  if(!r.ok) throw new Error(`Error ${r.status}: ${await r.text()}`)
  return r.json()
}
