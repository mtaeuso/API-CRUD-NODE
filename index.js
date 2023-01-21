//confi  inicial

require('dotenv').config()
import express, { urlencoded, json } from 'express'
const app = express()
import { set, connect } from 'mongoose'

//forma de leitura do JSON (middlewares)
app.use(
    urlencoded({
        extended: true,
    })
)
app.use(json()) 

// rotas da API

import personRoutes from './routes/personRoutes'
app.use('/person', personRoutes)

// rotas e endpoint

app.get('/', (req, res) => {
   //mostrar req
   res.json({ message: 'oi express!'})
})

set('strictQuery', false);

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

//entregar porta
connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.03bl1iq.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectado ao MongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))




