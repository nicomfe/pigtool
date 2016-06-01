const yargs = require('yargs')
const express = require('express')
const webpack = require('webpack')
const debug = require('debug')
const config = require('../config')
const history = require('connect-history-api-fallback')
const webpackconfig = require('../webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const browserSync = require('browser-sync')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const SowModel = require('../config/database/mongoose').SowModel
const ObjectId = require('mongodb').ObjectID
const cors = require('cors')
const log = debug('app:server')

debug.enable('app:*')

const app = express()

app.use(cors()) // simple allow all config
app.options('*', cors()) // enables pre-flight requests e.g. DELETE, PATCH

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(methodOverride())

// /api/sows

app.get('/api/sows', (req, res) => {
  return SowModel.find((err, sows) => {
    if (!err) {
      return res.send(sows)
    }
    res.statusCode = 500
    log('Internal error(%d): %s', res.statusCode, err.message)
    return res.send({ error: 'Server error' })
  })
})
app.post('/api/sows', (req, res) => {
  const sow = new SowModel({
    id: new ObjectId(),
    tag_number: req.body.tag_number,
    bought_date: req.body.bought_date,
    birth_date: req.body.birth_date,
    purchased_price: req.body.purchased_price,
    father_tag: req.body.father_tag,
    mother_tag: req.body.mother_tag,
  })

  sow.save((err) => {
    if (!err) {
      log('Sow created')
      return res.send({ status: 'OK', sow })
    }
    res.statusCode = 500
    log('Internal error(%d): %s', res.statusCode, err.message);
    return res.send({ error: 'Server error' })
  })
})
app.put('/api/sows', (req, res) => {
  res.send('Not implemented yet.')
})
app.delete('/api/sows', (req, res) => {
  res.send('Not implemented yet.')
})

const compiler = webpack(webpackconfig)

log('Enabling webpack dev middleware.')
app.use(webpackDevMiddleware(compiler, {
  lazy: false,
  noInfo: false,
  quiet: false,
  stats: config.compiler.stats,
}))

log('Enabling Webpack Hot Module Replacement (HMR).')
app.use(webpackHotMiddleware(compiler))

log(`Serving static content from ${config.paths.static}`)
app.use(express.static(config.paths.static))

log('Redirecting all other requests to index.html')
app.use(history({ verbose: true }))

const port = yargs.argv.port || config.server.port
app.listen(port, config.server.hostname, () => {
  log(`Server is now running at http://${config.server.hostname}:${port}.`)
})

if (yargs.argv.withBrowsersync) {
  browserSync.init({
    proxy: `${config.server.hostname}:${port}`,
    port: 4000,
    ui: {
      port: 4040,
      weinre: { port: 4444 },
    },
  })
}

module.exports = app
