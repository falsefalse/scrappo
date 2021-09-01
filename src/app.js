const express = require('express')
const fs = require('fs')
const path = require('path')
const serveIndex = require('serve-index')
const bleter = require('bookmarkleter')

const List = require('./list')

const STATIC_PATH = path.resolve(__dirname, './static')
const BLET_PATH = path.resolve(__dirname, './blet.tpl.js')
const DATA_PATH = path.resolve(__dirname, '../data')

const list = new List(DATA_PATH)
const app = express()

app.use('/', express.static(STATIC_PATH, { extensions: 'html' }))

app.use(
  '/all',
  express.static(DATA_PATH),
  serveIndex(DATA_PATH, {
    icons: true,
    view: 'details',
    filter: filename => /\.txt$/.test(filename)
  })
)

app.get('/add/:param_string', (req, res) => {
  const params = req.params.param_string.split('&')
  const [orderId, tracking, carrier] = params

  if (!orderId) {
    res.send('👅')
    return
  }

  list.append([orderId, tracking, carrier].compact().join(','))

  res.send('✅')
})

app.get('/last', (req, res) => {
  res.setHeader('content-type', 'text/plain')

  res.send(list.readLast() || 'No list yet ツ')
})

const hostname = req => req.headers['x-forwarded-host'] || req.headers.host

const minify = string => {
  const options = {
    urlencode: false,
    minify: true
  }

  return bleter(string, options)
}

app.get('/blet.js', (req, res) => {
  res.setHeader('content-type', 'text/plain')

  let blet = fs.readFileSync(BLET_PATH).toString()

  blet = blet
    .replace(/%%MINIFIED%%/g, minify(blet))
    .replace(/%%APP_URL%%/g, hostname(req))

  res.send(blet)
})

module.exports = app
