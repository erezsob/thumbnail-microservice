// import gm from 'gm';
const bunyan = require('bunyan')
const { pipe } = require('lodash/fp')
const validUrl = require('valid-url')

// Initializing bunyan for logs
const log = bunyan.createLogger({name: 'thumbnailer'})

/**
 * The main thumbnailer service function
 */
const thumbnailService = (req, res) => {
  // return validity(req, res);
}

/**
 * Rescaling images
 */
// const rescale = req => {
//   const decodedUrl = decode(req.params.urlBase64);

// }

/**
 * Validating all the URI data using the helper validating functions
 * Returns true or false
 */
const validity = (req, res) => {
  const params = req.params
  const base64Data = validateUrlBase64(params.urlBase64)
  const maxWidthData = validateMaxWidthHeight(params.maxWidth)
  const maxHeightData = validateMaxWidthHeight(params.maxHeight)
  const signatureBase64Data = validateSignatureBase64(params.signatureBase64)
  const extensionData = validateExtension(params.extension)

  if (base64Data && maxWidthData && maxHeightData && extensionData && signatureBase64Data) {
    return true
  }

  if (signatureBase64Data === false) {
    res.status(403)
    log.warn('Signature is invalid')
    return false
  }

  if ((base64Data && maxWidthData && maxHeightData && extensionData) === false && signatureBase64Data === true) {
    log.warn('One ro some parameters that are not the signature have failed')
    res.status(400)
    return false
  }
  return false
}

/**
 * Composing the function to validate urlBase64
 * Returns true or false
 */
const validateUrlBase64 = x => pipe(
  decode,
  checkUrlValidity
)

/**
 * Check Url Validity
 * Returns true or false
 */
const checkUrlValidity = x => !!validUrl.isUri(x)

/**
 * Decoding data from Base64 to regular string (URL string if it's valid)
 * Returns the decoded string
 */
const decode = x => Buffer.from(x, 'base64').toString('ascii')

/**
 * Validating that the maxWidth and maxHeight are according to the rules
 * Returns true or false
 */
const validateMaxWidthHeight = x => {
  return !!(!isNaN(x) && +3 < x && x < +1024)
}

/**
 * Validate the signature
 */
const validateSignatureBase64 = x => x

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
