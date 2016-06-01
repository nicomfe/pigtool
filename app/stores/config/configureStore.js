if (typeof __DEBUG__ !== 'undefined' && __DEBUG__) {
  module.exports = require('./configureStore.dev.js')
} else {
  module.exports = require('./configureStore.prod.js')
}
