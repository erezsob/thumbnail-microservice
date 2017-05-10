// import gm from 'gm';
// import bunyan from 'bunyan';
const { pipe } = require('lodash/fp');
const validUrl = require('valid-url');

const thumbnailService = (req, res) => {
  return validity(req);
}

/**
 * Composing the function
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
 * Returns transformed data or false if failed
 */
const verifyMaxWidthHeight = (x, prop) => {
  const newInt = x[prop] !== 'Number' ? parseInt(x[prop]) : x[prop];
  return !isNaN(newInt) && +3 < newInt && newInt < +1024 ? newInt : false;
}


const verifySignatureBase64 = x => {x.signatureBase64}

/**
 * Check that the property is one of the desired extensions options
 * Returns true or false
 */
const verifyExtension = x => /^jpeg|png|gif|ico|webm$/.test(x);


module.exports = thumbnailService;
module.exports.checkUrlValidity = checkUrlValidity;
module.exports.decode = decode;
module.exports.verifyMaxWidthHeight = verifyMaxWidthHeight;
module.exports.verifyExtension = verifyExtension;
