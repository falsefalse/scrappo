const app = require('./app')

const fromEnv = (key, defaultValue) => process.env[key] || defaultValue

const port = fromEnv('PORT', '8080')

app.listen(port, () => {
  console.log(`Scrappo listening at http://localhost:${port}`)
})
