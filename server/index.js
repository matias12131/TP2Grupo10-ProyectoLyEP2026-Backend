require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'Servidor funcionando' })
})

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))