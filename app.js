// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const sqlInjectionController = require('./controllers/sqlInjectionController');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let vulnerableMode = true;
let useVulnerableSession = true;

app.get('/', (req, res) => {
    res.render('home'); 
});

app.get('/search', (req, res) => {
    res.render('search', { vulnerableMode, results: null });
});

app.get('/login', (req, res) => {
    res.render('userLogin', { useVulnerableSession });
});

app.post('/search', (req, res) => {
    if (vulnerableMode) {
        sqlInjectionController.vulnerableSearch(req, res);
    } else {
        sqlInjectionController.safeSearch(req, res);
    }
});

app.post('/login', (req, res) => {
    if (useVulnerableSession) {
        authController.vulnerableLogin(req, res);
    } else {
        authController.secureLogin(req, res);
    }
});

app.post('/toggle-sql', (req, res) => {
    vulnerableMode = !vulnerableMode;
    res.redirect('/search');
});

app.post('/toggle-session-mode', (req, res) => {
    useVulnerableSession = !useVulnerableSession;
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
