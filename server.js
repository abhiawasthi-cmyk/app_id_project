// Import necessary packages
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibm-appid').WebAppStrategy;

// Initialize the Express app
const app = express();
const port = 3000;

// Setup session middleware
app.use(session({
    secret: 'a-very-secret-string-for-your-session',
    resave: false,
    saveUninitialized: true
}));

// Setup Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// --- CONFIGURE APP ID STRATEGY ---
// Your credentials have been inserted here
passport.use(new WebAppStrategy({
    tenantId: "4e70af5f-660a-496c-af71-ec383f9e0ebb",
    clientId: "fe8c2ebe-9514-460a-96b6-ce55abd9084d",
    secret: "YTEyY2RjYzUtNmUxMC00Y2Y4LWJlN2EtZGZhNzMwZTcyNzYy",
    oauthServerUrl: "https://au-syd.appid.cloud.ibm.com/oauth/v4/4e70af5f-660a-496c-af71-ec383f9e0ebb",
    redirectUri: "http://localhost:3000/appid/callback"
}));

// Configure Passport to manage user sessions
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

// --- DEFINE ROUTES ---

// The callback route that App ID will redirect to after login
app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME, { failureRedirect: '/error' }));

// Route to start the login process
app.get('/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: '/protected',
    forceLogin: true
}));

// Public homepage
app.get('/', (req, res) => {
    res.send(`<h1>Welcome!</h1><p>This page is public and doesn't require a login.</p><a href="/protected">Go to Protected Page</a>`);
});

// Protected route that requires a user to be logged in
app.get('/protected', passport.authenticate(WebAppStrategy.STRATEGY_NAME), (req, res) => {
    // The user object contains the user's information
    res.send(`<h1>Hello, ${req.user.name || 'User'}!</h1><p>This is a protected page. You are successfully logged in.</p><p>Your email is: ${req.user.email}</p><a href="/logout">Logout</a>`);
});

// Route to log the user out
app.get('/logout', (req, res) => {
    WebAppStrategy.logout(req);
    res.redirect('/');
});

// A simple error page
app.get('/error', (req, res) => {
    res.send('Login Failed. Please try again.');
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
});