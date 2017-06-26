'use strict'

const { expect } = require('chai')
const thumbnailService = require('./thumbnail_service')
const base64url = require('base64-url')
const config = require('config')
const image = 'http://vignette2.wikia.nocookie.net/rickandmorty/images/1/1e/Rick_and_morty_icon.png/revision/latest?cb=20150805041642.png'

/* eslint-disable no-undef */

describe('thumbnailService', () => {
  describe('checkUrlValidity', () => {
    it('should check if a string is a url', (done) => {
      const testData = [
        {
          inputData: image,
          expectedData: true
        },
        {
          inputData: 'abcdefg',
          expectedData: false
        }
      ]

      testData.forEach((testItem) => {
        const returnData = thumbnailService.checkUrlValidity(testItem.inputData)
        expect(returnData).to.equal(testItem.expectedData)
      })

      done()
    })
  })

  describe('decode', () => {
    it('should decode base64', (done) => {
      const encodedString = base64url.escape(base64url.encode(image))

      const testData = {
        inputData: encodedString,
        expectedData: image
      }

      const returnData = thumbnailService.decode(testData.inputData)
      expect(returnData).to.equal(testData.expectedData)
      done()
    })
  })

  describe('verifyMaxWidthHeight', () => {
    it('should check if data is a number and between 3 and 1024', (done) => {
      const testData = [
        {
          inputData: 400,
          expectedData: true
        },
        {
          inputData: 1,
          expectedData: false
        },
        {
          inputData: '5000',
          expectedData: false
        }
      ]

      testData.forEach((testItem) => {
        const returnData = thumbnailService.validateMaxWidthHeight(testItem.inputData)
        expect(returnData).to.equal(testItem.expectedData)
      })

      done()
    })
  })

  describe('verifyExtension', () => {
    it('should check that the extension is one of the allowed ones', (done) => {
      const testData = [
        {
          inputData: 'jpeg',
          expectedData: true
        },
        {
          inputData: 'png',
          expectedData: true
        },
        {
          inputData: 'gif',
          expectedData: true
        },
        {
          inputData: 'ico',
          expectedData: true
        },
        {
          inputData: 'webm',
          expectedData: true
        },
        {
          inputData: 'wav',
          expectedData: false
        }
      ]

      testData.forEach((testItem) => {
        const returnData = thumbnailService.validateExtension(testItem.inputData)
        expect(returnData).to.equal(testItem.expectedData)
      })
      done()
    })
  })

  describe('validity', () => {
    it('should validate all the url params', (done) => {
      const req = {
        params: {
          urlBase64: base64url.escape(base64url.encode(image)),
          maxWidth: 100,
          maxHeight: 100,
          signatureBase64: '',
          extension: 'jpeg'
        }
      }

      const secret = config.get('settings.shared-secret')
      req.params.signatureBase64 = thumbnailService.cryptFunc(req.params, secret)

      const { paramsValid } = thumbnailService.validity(req)
      expect(paramsValid()).to.equal(true)
      done()
    })
  })

  describe('validateSignatureBase64', () => {
    it('should create new signature and compare it to the ' +
    'signatureBase64 parameter', (done) => {
      const req = {
        params: {
          urlBase64: base64url.escape(base64url.decode(image)),
          maxWidth: 100,
          maxHeight: 100,
          signatureBase64: '',
          extension: 'png'
        }
      }

      const secret = config.get('settings.shared-secret')
      req.params.signatureBase64 = thumbnailService.cryptFunc(req.params, secret)

      const returnData = thumbnailService.validateSignatureBase64(req.params, secret)
      expect(returnData).to.equal(true)
      done()
    })
  })
})
