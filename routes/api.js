const express = require('express')
const router = express.Router()
const bunyan = require('bunyan')

// Initializing bunyan for logs
const log = bunyan.createLogger({name: 'thumbnailer'})

const thumbnailService = require('../thumbnail_service')

router.route('/:urlBase64/:maxWidth/:maxHeight/:signatureBase64.:extension')
.get(thumbnailService)
.catch(error => {
  log.warn(error)
  // Retry retrieving request data a configurable amount of times, if fails respond with 502, if the retrieval times out after a configurable period, respond with 504
  Promise.reject(error)
})

module.exports = router
