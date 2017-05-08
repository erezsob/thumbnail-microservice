const express = require('express');
const router = express.Router();

const thumbnailService = require('./thumbnail_service');

router.route('/:urlBase64/:maxWidth/:maxHeight/:signatureBase64.:extension').get(thumbnailService);

module.exports = router;