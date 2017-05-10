
const { expect } = require('chai');
const thumbnailService = require('./thumbnail_service');
const validUrl = require('valid-url');


/* eslint-disable no-undef */

describe('thumbnailService', () => {
  describe('thumbnailService.checkUrlValidity', () => {
    it('should check if a string is a url', (done) => {
      const testData = [
        {
          inputData: 'http://www.example.com',
          expectedData: 'http://www.example.com'
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


  describe('thumbnailService.decode', () => {
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

  describe('thumbnailService.verifyMaxWidthHeight', () => {
    it('should check if data is a number and between 3 and 1024', (done) => {

      const testData = [
        {
          inputData: {value: {maxWidth: '355'}, prop: 'maxWidth'},
          expectedData: 355
        },
        {
          inputData: {value: {maxHeight: 400}, prop: 'maxHeight'},
          expectedData: 400
        },
        {
          inputData: {value: {maxWidth: 1}, prop: 'maxWidth'},
          expectedData: false
        },
        {
          inputData: {value: {maxHeight: '5000'}, prop: 'maxHeight'},
          expectedData: false
        },
        {
          inputData: {value: {maxWidth: 'abcdefg'}, prop: 'maxWidth'},
          expectedData: false
        }
      ]

      testData.forEach((testItem) => {
        const returnData = thumbnailService.verifyMaxWidthHeight(testItem.inputData.value, testItem.inputData.prop);
        expect(returnData).to.equal(testItem.expectedData);
      });

      done();
    })
  })

})
