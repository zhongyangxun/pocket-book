import express from 'express'
import cors from 'cors'
import routes from './routes'

const port = 5000
const app = express()

app.use(cors())
app.use(express.json())

routes(app)

app.listen(port, () => {
  global.console.log(`Express server is listening at http://localhost: ${port}.`)
})
