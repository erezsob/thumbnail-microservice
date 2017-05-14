const bunyan = require('bunyan')
const { pipe } = require('lodash/fp')
const validUrl = require('valid-url')
const gm = require('gm')
const request = require('request')
const crypto = require('crypto')
const base64url = require('base64-url')
const config = require('config')

// Initializing bunyan for logs
const log = bunyan.createLogger({ name: 'thumbnailer' })

/**
 * The main thumbnailer service function
 */
const thumbnailService = (req, res) => {
  const cache = config.get('settings.cache-time')
  if (validity(req, res)) {
    res.set({
      'Content-Type': `image/${req.params.extension}`,
      'Cache-Control': `max-age=${cache}`
    })
    return rescale(req).pipe(res)
  }
}

/**
 * Rescaling images and convert to the desired format base on the url params
 */
const rescale = (req, res) => {
  const decodedUrl = decode(req.params.urlBase64)
  if (/^gif|ico|webm$/.test(req.params.extension)) {
    gm.subClass({ imageMagick: true })
  }
  return gm(request(decodedUrl))
  .setFormat(req.params.extension)
  .resize(req.params.maxWidth, req.params.maxHeight)
  .stream((err, stdout, stderr) => {
    if (!err) {
      log.info('Rescaling is finished')
    } else {
      log.warn(err)
    }
  })
}

/**
 * Validating all the URI data using the helper validating functions
 * Returns true or false
 */
const validity = (req, res) => {
  const secret = config.get('settings.shared-secret')

  const params = req.params
  const base64Data = validateUrlBase64(params.urlBase64)
  const maxWidthData = validateMaxWidthHeight(params.maxWidth)
  const maxHeightData = validateMaxWidthHeight(params.maxHeight)
  const signatureBase64Data = validateSignatureBase64(params, secret)
  const extensionData = validateExtension(params.extension)

  if (base64Data && maxWidthData && maxHeightData && extensionData && signatureBase64Data) {
    return true
  }

  if (signatureBase64Data === false) {
    const msg = 'Signature is invalid'
    log.warn(msg)
    res.status(403).send(msg)
    return false
  }

  if ((base64Data && maxWidthData && maxHeightData && extensionData) === false 
      && signatureBase64Data === true) {
    const msg = 'One or more parameters that are not the signature have failed'
    log.warn(msg)
    res.status(400).send(msg)
    return false
  }
  return false
}

/**
 * Composing functions to validate urlBase64
 * Returns true or false
 */
const validateUrlBase64 = () => pipe(
  decode,
  checkUrlValidity
)

/**
 * Check that the url is valid after it had been decoded
 * Returns true or false
 */
const checkUrlValidity = url => !!validUrl.isUri(url)

/**
 * Decoding data from Base64 to regular string (URL string if it's valid)
 * Returns the decoded string
 */
const decode = encodedUrl => base64url.decode(base64url.unescape(encodedUrl, 'base64'))

/**
 * Validating that the maxWidth and maxHeight are according to the rules
 * Returns true or false
 */
const validateMaxWidthHeight = sizeParam => {
  return !!(!isNaN(sizeParam) && +3 < sizeParam && sizeParam < +1024)
}

/**
 * Validate the signature from the url params and the signature created base on 
 * the  shared secret and the other url params
 */
const validateSignatureBase64 = (params, secret) => {
  return params.signatureBase64 === cryptFunc(params, secret)
}

/**
 * Create a new encrypted signature from the url params and the shared secret
 * Returns {String}
 */
const cryptFunc = (params, secret) => {
  const cryptedParams = crypto.createHmac('sha256', secret)
    .update(params.urlBase64)
    .update(params.maxWidth.toString())
    .update(params.maxHeight.toString())
    .update(params.extension)
    .digest('base64')
  return base64url.escape(cryptedParams)
}

/**
 * Check that the property is one of the allowed extensions options
 * Returns true or false
 */
const validateExtension = x => /^jpeg|png|gif|ico|webm$/.test(x)

module.exports = thumbnailService
module.exports.checkUrlValidity = checkUrlValidity
module.exports.decode = decode
module.exports.validateMaxWidthHeight = validateMaxWidthHeight
module.exports.validateExtension = validateExtension
module.exports.validity = validity
module.exports.rescale = rescale
module.exports.validateSignatureBase64 = validateSignatureBase64
module.exports.cryptFunc = cryptFunc
