const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up a static route to serve the contents of the '../client/dist' folder, which is where the built webpack bundle is located. 
app.use(express.static(path.join(__dirname, '../client/dist'))); // Dist folder will be created after we start the app.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Error handling middleware, to handle errors and avoid the app from crashing.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Requires a custom htmlRoutes module and passes the app instance to it. 
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
