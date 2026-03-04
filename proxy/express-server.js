
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import 'dotenv/config'
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 4000
const BASE = process.env.SIATA_BASE || 'https://repopruebas.siata.gov.co'
app.get('/api/siata/estaciones', async (req,res)=>{
  try{
    const r = await fetch(`${BASE}/datos_siata/application/index.php/estaciones/getEstaciones`)
    if(!r.ok) return res.status(r.status).send(await r.text())
    res.json(await r.json())
  }catch(e){ res.status(500).json({error:String(e)}) }
})
app.listen(PORT, ()=>console.log(`SIATA proxy on http://localhost:${PORT}`))
