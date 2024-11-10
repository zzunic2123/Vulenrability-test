// controllers/authController.js
const db = require('../db');
const crypto = require('crypto');

let sessionCounter = 1;

exports.vulnerableLogin = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    
    db.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).send('Database error');
        if (results.rows.length > 0) {
            const sessionId = sessionCounter++;
            res.cookie('session_id', sessionId, { httpOnly: false });
            res.redirect(`/login?sessionId=${sessionId}&mode=vulnerable`);
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
};

exports.secureLogin = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';

    db.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).send('Database error');
        if (results.rows.length > 0) {
            const sessionId = crypto.randomBytes(16).toString('hex');
            res.cookie('session_id', sessionId, {
                httpOnly: true,
                secure: true,
            });
            res.redirect(`/login?sessionId=${sessionId}&mode=secure`);
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
};
