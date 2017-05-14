const express = require('express')
const router = express.Router()
const bunyan = require('bunyan')
// const config = require('config');

// Initializing bunyan for logs
const log = bunyan.createLogger({name: 'thumbnailer'})

const thumbnailService = require('../thumbnail_service')

router.route('/:urlBase64/:maxWidth/:maxHeight/:signatureBase64.:extension')
.get(thumbnailService)

/**
 * Middleware for handling errors when attempting retrival
 */
const errorsMiddleware = (err, req, res, next) => {
  // const retries = config.get('settings.retries');
  // const timeouts = config.get('settings.cache-time');

  log.warn(err)
  // Retry retrieving request data a configurable amount of times, if fails respond with 502, if the retrieval times out after a configurable period, respond with 504
  return res.send(err)
}

module.exports = router
module.exports.errorsMiddleware = errorsMiddleware
