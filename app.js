'use strict'

const express = require('express')

const app = express()
const port = process.env.PORT || 3001

const api = require('./routes/api')

app.use('/', api)

app.listen(port, err => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Running app on PORT ${port}`)
  }
})
