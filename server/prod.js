const yargs = require('yargs')
const express = require('express')
const debug = require('debug')
const config = require('../config')

debug.enable('app:*')

const app = express()

const log = debug('app:server')

log(`Serving productionn site from ${config.paths.dist}`)
app.use(express.static(config.paths.dist))

const port = yargs.argv.port || config.server.port
app.listen(port, config.server.hostname, () => {
  log(`Server is now running at http://${config.server.hostname}:${port}.`)
})


module.exports = app
