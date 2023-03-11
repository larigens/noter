const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up a static route to serve the contents of the '../client/dist' folder, which is where the built webpack bundle is located. 
app.use(express.static('../client/dist')); // Dist folder will be created after we start the app.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requires a custom htmlRoutes module and passes the app instance to it. 
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
