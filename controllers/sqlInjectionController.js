const db = require('../db');

exports.vulnerableSearch = (req, res) => {
    const userInput = req.body.query;
    const query = `SELECT * FROM users WHERE username = '${userInput}'`;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Database error');
        res.render('search', { vulnerableMode: true, results: results.rows });
    });
};

exports.safeSearch = (req, res) => {
    const userInput = req.body.query;
    const query = `SELECT * FROM users WHERE username = $1`;

    db.query(query, [userInput], (err, results) => {
        if (err) return res.status(500).send('Database error');
        res.render('search', { vulnerableMode: false, results: results.rows });
    });
};
