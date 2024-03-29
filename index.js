const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/user');
const db = require('./db');


db.connect();
const app = express();
const PORT = process.env.PORT || 3002;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true
}));



// Routes
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Simple validation
    if (!username || !password) {
        res.send('Please enter both username and password.');
        return;
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.send('User already exists.');
            return;
        }

        // Create new user and save to the database
        const newUser = new User({ username, password });
        await newUser.save();
        req.session.user = newUser;
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user.');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username and password
        const user = await User.findOne({ username, password });
        if (user) {
            req.session.user = user;
            res.redirect('/dashboard');
        } else {
            res.send('Invalid username or password.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
});

app.get('/dashboard', (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.redirect('/');
        return;
    }
    res.render('dashboard', { user });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
