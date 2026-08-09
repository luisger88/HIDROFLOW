
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import 'dotenv/config'
import fs from 'fs'
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
app.get('/api/proyecto/activo', async (req, res) => {

  try {

    const casoActivo = JSON.parse(
      fs.readFileSync(
        'D:/HidroFlow/02_CORE/config/caso_activo.json',
        'utf8'
      )
    );

    const otId = casoActivo.otId;

    const rutaProyecto =
      `D:/HidroFlow/02_PROYECTOS/${otId}/${otId}.hfproj`;

    const proyecto = JSON.parse(
      fs.readFileSync(
        rutaProyecto,
        'utf8'
      )
    );

    res.json(proyecto);

  } catch (e) {

    res.status(500).json({
      error: String(e)
    });

  }

});

app.post('/api/proyecto/activo', async (req, res) => {

  try {

    const casoActivo = JSON.parse(
      fs.readFileSync(
        'D:/HidroFlow/02_CORE/config/caso_activo.json',
        'utf8'
      )
    );

    const otId = casoActivo.otId;

    const rutaProyecto =
      `D:/HidroFlow/02_PROYECTOS/${otId}/${otId}.hfproj`;

    const proyecto = JSON.parse(
      fs.readFileSync(
        rutaProyecto,
        'utf8'
      )
    );

    const actualizado = {
      ...proyecto,
      ...req.body
    };

    fs.writeFileSync(
      rutaProyecto,
      JSON.stringify(
        actualizado,
        null,
        2
      ),
      'utf8'
    );

    res.json({
      ok: true
    });

  } catch (e) {

    res.status(500).json({
      error: String(e)
    });

  }

});
app.listen(PORT, ()=>console.log(`SIATA proxy on http://localhost:${PORT}`))
