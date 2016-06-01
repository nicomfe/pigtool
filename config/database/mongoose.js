const mongoose = require('mongoose')
const debug = require('debug')
const log = debug('app:server')
const config = require('../index')

mongoose.connect(config.mongoose.uri)
const db = mongoose.connection

db.on('error', (err) => {
  log('Error: Connection db error: ', err.message)
})

db.once('open', () => {
  log('Info: Connected to db!')
})

const Schema = mongoose.Schema

// Schemas
const Sow = new Schema({
  id: { type: Schema.Types.ObjectId },
  tag_number: { type: String, required: true },
  bought_date: { type: Date },
  birth_date: { type: Date },
  purchased_price: { type: String },
  father_tag: { type: String },
  mother_tag: { type: String },
})

const SowModel = mongoose.model('Sow', Sow)
module.exports.SowModel = SowModel
