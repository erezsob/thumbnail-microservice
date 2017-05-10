// import gm from 'gm';
// import bunyan from 'bunyan';
const { pipe } = require('lodash/fp');
const validUrl = require('valid-url');


// urlBase64
const verifyUrlBase64 = x => pipe(
  decode,
  checkUrlValidity
);

const checkUrlValidity = x => validUrl.isUri(x) ? x : false;
const decode = x => Buffer.from(x, 'base64').toString('ascii');


const verifyMaxHeight = x => {x.maxHeight}
const verifySignatureBase64 = x => {x.signatureBase64}
const verifyExtension = x => {x.extension}


module.exports = thumbnailService;
module.exports.checkUrlValidity = checkUrlValidity;
module.exports.decode = decode;
