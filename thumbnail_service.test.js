'use strict'

const { expect } = require('chai')
const thumbnailService = require('./thumbnail_service')
const sinon = require('sinon')

/* eslint-disable no-undef */

describe('thumbnailService', () => {
  describe('checkUrlValidity', () => {
    it('should check if a string is a url', (done) => {
      const testData = [
        {
          inputData: 'http://www.example.com',
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
      const encodedString = Buffer.from('http://www.example.com').toString('base64')

      const testData = {
        inputData: encodedString,
        expectedData: 'http://www.example.com'
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
          urlBase64: Buffer.from('http://www.example.com').toString('base64'),
          maxWidth: 600,
          maxHeight: 600,
          signatureBase64: true,
          extension: 'gif'
        }
      }

      const returnData = thumbnailService.validity(req)
      expect(returnData).to.equal(true)
      done()
    })
  })

  describe('validateSignatureBase64', () => {
    it.only('should create new signature and compare it to the ' +
    'signatureBase64 parameter', (done) => {

      const req = {
        params: {
          urlBase64: Buffer.from('http://www.example.com').toString('base64'),
          maxWidth: 600,
          maxHeight: 600,
          signatureBase64: '',
          extension: 'gif'
        }
      }

      const secret = 'meeseeks'
      const signature = req.params.urlBase64 + req.params.maxWidth.toString() 
      + req.params.maxHeight.toString() + req.params.extension + secret

      req.params.signatureBase64 = Buffer.from(signature).toString('base64')

      const returnData = thumbnailService.validateSignatureBase64(req)
      expect(returnData).to.equal(req.params.expectedSignature)
      done()
    })
  })
})
