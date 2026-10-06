const express = require('express');
const cors = require('cors');
require('dotenv').config();

const loanRoutes = require('../routes/loanRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Main Route
app.use('/api/loans', loanRoutes);

app.get('/', (req, res) => {
    res.send('Library Loan Management API is running...');
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;