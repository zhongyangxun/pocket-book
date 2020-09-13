import express from 'express'
import path from 'path'

const port = 9000
const app = express()

app.use(express.static(path.join(__dirname, '../build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

app.listen(port, () => {
  global.console.log(`Express server is serve app at http://localhost:${port}`)
})
