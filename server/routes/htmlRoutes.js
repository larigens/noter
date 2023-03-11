const path = require('path');

// We only need one route for this app.
module.exports = (app) =>
  // Sends a file as an HTTP response to the client.
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })


