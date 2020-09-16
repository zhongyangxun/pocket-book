import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const port = 5000
const app = express()

const origin = process.env.NODE_ENV === 'production'
  ? 'http://47.95.241.143:9000'
  : 'http://localhost:3000'

const corsOptions = {
  origin
}

app.use(cors(corsOptions))
app.use(express.json())

routes(app)

app.listen(port, () => {
  global.console.log(`Express server is listening at http://localhost: ${port}.`)
})
