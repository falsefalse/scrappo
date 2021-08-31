const express = require('express')
const fs = require('fs')

const app = express()
const port = 8080

const LIST = './list.txt'

const append = line => fs.appendFileSync(LIST, `${line}\n`)

app.get('/', (req, res) => {
  res.send('SOSI PISOS')
})

app.get('/add/:tn_oid', (req, res) => {
  const tn_oid = req.params.tn_oid
  const [tracking, orderId] = tn_oid.split('&')

  if (!orderId || !tracking) {
    res.send('👅')
    return
  }

  append([orderId, tracking])

  res.send('✅')
})

app.get('/list', (req, res) => {
  let list

  try {
    list = fs.readFileSync(LIST, 'utf8')
  } catch {
    res.send('No list yet ツ')
    return
  }

  res.setHeader('content-type', 'text/plain')
  res.send(list)
})

app.get('/blet.js', (req, res) => {
  const blet = fs.readFileSync('./blet.js', 'utf8')

  res.setHeader('content-type', 'text/plain')
  res.send(blet)
})

app.listen(port, () => {
  console.log(`Scrappo listening at http://localhost:${port}`)
})
