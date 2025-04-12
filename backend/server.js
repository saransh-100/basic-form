import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.post('/login', (req, res) => {
    console.log('Received form data:', req.body)
    res.status(200).json({
        message: 'Form received successfully!',
        data: req.body
      })
})

app.listen(port, () => {
  console.log(` Server listening at http://localhost: ${port}`)
})