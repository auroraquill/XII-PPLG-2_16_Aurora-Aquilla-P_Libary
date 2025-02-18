// File: app.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3434;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;