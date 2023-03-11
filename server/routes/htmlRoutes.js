const path = require('path');

module.exports = (app) =>
  // We only need one route for this app.
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html')) // Sends a file as an HTTP response to the client.
  );
