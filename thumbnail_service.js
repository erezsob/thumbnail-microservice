// import gm from 'gm';
// import bunyan from 'bunyan';
const { pipe } = require('lodash/fp');
const validUrl = require('valid-url');

const thumbnailService = (req, res) => {
  return validity(req);
}

const validity = (req) => {
  const params = req.params;
  const base64Data = verifyUrlBase64(params.urlBase64);
  const maxWidthData = verifyMaxWidthHeight(params.maxWidth);
  const maxHeightData = verifyMaxWidthHeight(params.maxHeight);
  const signatureBase64Data = verifySignatureBase64(params.signatureBase64);
  const extensionData = verifyExtension(params.extension);
}

/**
 * Composing the function to verify urlBase64
 * Return true or false
 */
const verifyUrlBase64 = x => pipe(
  decode,
  checkUrlValidity
);

/**
 * Check Url Validity
 * Returns true or false
 */
const checkUrlValidity = x => validUrl.isUri(x) ? true : false;

/**
 * Decoding data from Base64 to regular string (URL string if it's valid)
 * Return the decoded string
 */
const decode = x => Buffer.from(x, 'base64').toString('ascii');

/**
 * Verifying that the maxWidth and maxHeight are according to the rules
 * Returns true or false
 */
const verifyMaxWidthHeight = x => {
  return !isNaN(x) && +3 < x && x < +1024 ? true : false;
}


const verifySignatureBase64 = x => {x.signatureBase64}

/**
 * Check that the property is one of the allowed extensions options
 * Returns true or false
 */
const verifyExtension = x => /^jpeg|png|gif|ico|webm$/.test(x);


module.exports = thumbnailService;
module.exports.checkUrlValidity = checkUrlValidity;
module.exports.decode = decode;
module.exports.verifyMaxWidthHeight = verifyMaxWidthHeight;
module.exports.verifyExtension = verifyExtension;
