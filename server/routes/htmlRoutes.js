import path from 'path';

// We only need one route for this app.
export default (app) => {
  // Sends a file as an HTTP response to the client.
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
};

