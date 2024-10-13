const express = require('express');
const path = require('path');

// Import game routes
const gameRoutes = require('./routes/gameRoutes');
const gameRoutesJSON = require('./routes/gameRoutesJSON');

const app = express();
const port = 8000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Use the routes
app.use('/', gameRoutes);
app.use('/api', gameRoutesJSON);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
