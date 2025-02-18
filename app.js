// File: app.js
const express = require('express');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);

const PORT = process.env.PORT || 3434;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;