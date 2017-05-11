const express = require('express')
const router = express.Router()

const thumbnailService = require('../thumbnail_service')

router.route('/:urlBase64/:maxWidth/:maxHeight/:signatureBase64.:extension')
.get(thumbnailService)
.catch(error => {
  bunyan.ERROR(error);
  // Retry retrieving request data a configurable amount of times, if fails respond with 502, if the retrieval times out after a configurable period, respond with 504
  res.send(502);
  Promise.reject(error);
});

module.exports = router
