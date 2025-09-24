// Import necessary packages
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

// Initialize the Express app
const app = express();
const port = 3000;

// A simple in-memory "database" for our blog posts
const posts = [
    { id: 1, title: 'Welcome to the Blog', content: 'This is the first post.', author: 'Abhishek Awasthi' }
];
let postIdCounter = 2;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'a-very-secret-string-for-your-session',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Your IBM App ID credentials
passport.use(new WebAppStrategy({
    tenantId: "4e70af5f-660a-496c-af71-ec383f9e0ebb",
    clientId: "fe8c2ebe-9514-460a-96b6-ce55abd9084d",
    secret: "YTEyY2RjYzUtNmUxMC00Y2Y4LWJlN2EtZGZhNzMwZTcyNzYy",
    oauthServerUrl: "https://au-syd.appid.cloud.ibm.com/oauth/v4/4e70af5f-660a-496c-af71-ec383f9e0ebb",
    redirectUri: "http://localhost:3000/appid/callback"
}));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

// Middleware function to protect routes
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is logged in, proceed
    }
    res.redirect('/login'); // User is not logged in, send to login page
}


// --- ROUTES ---

// --- ROUTE UPDATED HERE ---
app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: '/', // Explicitly redirect to homepage on success
    failureRedirect: '/error'
}));

app.get('/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// 1. Public Homepage - Lists all blog posts
app.get('/', (req, res) => {
    const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                background-image: url('https://i.ibb.co/nM0jRpcv/cropped-Gemini-Generated-Image-w8b6enw8b6enw8b6.png');
                background-size: cover;
                background-attachment: fixed;
                text-align: center;
                color: #333;
            }
            .container {
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .logo {
                width: 100px;
                margin-bottom: 10px;
            }
        </style>
    `;

    let bodyContent = `<div class="container">`;
    bodyContent += `<img src="https://i.ibb.co/SDvySGK7/fork.png" alt="Fork and Footprint Logo" class="logo">`;
    
    bodyContent += `<h1>Fork and Footprint</h1>`;

    if (req.isAuthenticated()) {
        bodyContent += `<p>Welcome, ${req.user.name}! <a href="/create-post">Create a New Post</a> | <a href="/logout">Logout</a></p>`;
    } else {
        bodyContent += `<p><a href="/login">Login to Create a Post</a></p>`;
    }

    bodyContent += '<h2>Posts:</h2>';
    posts.forEach(post => {
        bodyContent += `<div><h3><a href="/posts/${post.id}">${post.title}</a></h3><p>by ${post.author}</p></div>`;
    });
    
    bodyContent += `</div>`;
    
    res.send(`<!DOCTYPE html><html><head><title>Fork and Footprint</title>${styles}</head><body>${bodyContent}</body></html>`);
});

// 2. Public Single Post Page
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.send(`<h1>${post.title}</h1><p>by ${post.author}</p><div>${post.content}</div><a href="/">Back to Home</a>`);
    } else {
        res.status(404).send('Post not found');
    }
});

// 3. Protected Route - Show form (uses our new middleware)
app.get('/create-post', ensureAuthenticated, (req, res) => {
    res.send(`
        <h1>Create a New Post</h1>
        <form action="/create-post" method="POST">
            <div><label for="title">Title:</label><br><input type="text" id="title" name="title" required></div><br>
            <div><label for="content">Content:</label><br><textarea id="content" name="content" rows="5" required></textarea></div><br>
            <button type="submit">Create Post</button>
        </form>
        <a href="/">Cancel</a>
    `);
});

// 4. Protected Route - Handle form submission (uses our new middleware)
app.post('/create-post', ensureAuthenticated, (req, res) => {
    const newPost = {
        id: postIdCounter++,
        title: req.body.title,
        content: req.body.content,
        author: req.user.name
    };
    posts.push(newPost);
    res.redirect('/');
});


app.get('/error', (req, res) => {
    res.send('Login Failed. Please try again.');
});

app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
});