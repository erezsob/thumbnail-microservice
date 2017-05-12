# Thumbnailer

Thumbnailer is a mountable express app, which serves rescaled images of given image URLs


### Installation

Thumbnailer requires [Node.js](https://nodejs.org/) v6.4+ to run.

```sh
$ npm install
$ npm start
```

In order to configure settings like shared-secret, retries, cache-time and timeouts - enter the start command and set the new settings as an object in the same line.

For example:

```sh
$ npm start --NODE_CONFIG='{"settings":{"cache-time":120, "retries": 6}}'
```

