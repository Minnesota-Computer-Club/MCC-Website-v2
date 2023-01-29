// Import required dependencies.
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const next = require('next');
require('dotenv').config();

// Determine we are using a development build or a production build.
// This will determine what PORT and connection type we use.
const isDevBuild = process.env.NODE_ENV !== 'production';

// Declare constants used by the server.
const port = isDevBuild ? 4444 : 443;

// Create an instance of an Express server that will orchestrate our server.
const app = express();

// Create an instance of a Next.js app that will run on top of Express.
const nextApp = next({ dev: isDevBuild });
const nextHandler = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  isDevBuild ?
    // Create HTTP server for development builds.
    http.createServer({}, app).listen(port, function () {
      console.log('[DEVELOPMENT] Express server listening on port ' + port);
    })
  :
    // Create HTTPS server for production builds.
    https.createServer({ cert: fs.readFileSync(process.env.PATH_TO_CERT), key: fs.readFileSync(process.env.PATH_TO_CERT),}, app).listen(port, function () {
      console.log('[PRODUCTION] Express server listening on port ' + port);
    });
})();
