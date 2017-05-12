# Thumbnailer

Thumbnailer is a npm module that is a mountable express app, which serves rescaled imagesof gives image URLs


### Installation

Thumbnailer requires [Node.js](https://nodejs.org/) v6.4+ to run.

```sh
$ npm install
```

```sh
$ node start
```

In order to configure settings like shared-secret, retries, cache-time and timeouts run app.js and set the new settings as an object.

For example:

```sh
$ node start --NODE_CONFIG='{"settings":{"cache-time":120, "retries": 6}}'
```

