const express = require('express')
const fs = require('fs')
const path = require('path')
const serveIndex = require('serve-index')

const List = require('./list')

const app = express()
const port = 8090

const DATA_PATH = path.resolve(__dirname, '../data')
const list = new List(DATA_PATH)

app.use(
  '/',
  express.static(path.resolve(__dirname, './static'), { extensions: 'html' })
)

app.use(
  '/all',
  express.static(DATA_PATH),
  serveIndex(DATA_PATH, {
    icons: true,
    view: 'details',
    filter: filename => /\.txt$/.test(filename)
  })
)

app.get('/add/:tn_oid', (req, res) => {
  const tn_oid = req.params.tn_oid
  const [tracking, orderId] = tn_oid.split('&')

  if (!orderId || !tracking) {
    res.send('👅')
    return
  }

  list.append([orderId, tracking])

  res.send('✅')
})

app.get('/last', (req, res) => {
  res.setHeader('content-type', 'text/plain')

  const lastList = list.readLast()
  res.send(lastList || 'No list yet ツ')
})

const hostname = req => req.headers['x-forwarded-host'] || req.headers.host

app.get('/blet.js', (req, res) => {
  res.setHeader('content-type', 'text/plain')

  const blet = fs
    .readFileSync(path.resolve(__dirname, './blet.tpl.js'))
    .toString()
    .replace(/%%APP_URL%%/g, hostname(req))

  res.send(blet)
})

module.exports = app
