
const { expect } = require('chai');
const thumbnailService = require('./thumbnail_service');
const validUrl = require('valid-url');


/* eslint-disable no-undef */
describe('First test', () => {
  it('should pass', () => {
    expect(true).to.equal(true)
  })
})

describe('thumbnailService', () => {
  describe.only('thumbnailService.checkUrlValidity', () => {
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
    })
  })

})
