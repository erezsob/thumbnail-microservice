'use strict';

const { expect } = require('chai');
const thumbnailService = require('./thumbnail_service');
const validUrl = require('valid-url');


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
        const returnData = thumbnailService.checkUrlValidity(testItem.inputData);
        expect(returnData).to.equal(testItem.expectedData);
      });

      done();
    })
  })


  describe('decode', () => {
    it('should decode base64', (done) => {

      const encodedString = Buffer.from("http://www.example.com").toString('base64');

      const testData = {
        inputData: encodedString,
        expectedData: 'http://www.example.com'
      }

      const returnData = thumbnailService.decode(testData.inputData);
      expect(returnData).to.equal(testData.expectedData);
      done();
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
        const returnData = thumbnailService.verifyMaxWidthHeight(testItem.inputData);
        expect(returnData).to.equal(testItem.expectedData);
      });

      done();
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
      ];

       testData.forEach((testItem) => {
        const returnData = thumbnailService.verifyExtension(testItem.inputData);
        expect(returnData).to.equal(testItem.expectedData);
      });

      done();
    })
  })

})
