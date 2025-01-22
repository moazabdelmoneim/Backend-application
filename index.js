import express from 'express'
import bootsrap from './src/app.controller.js'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve('./src/config/.env')})
const app = express()
const port = process.env.PORT
bootsrap(app, express)

app.listen(port, () => console.log(`Saraha app listening on port ${port}!`))