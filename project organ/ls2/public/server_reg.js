const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login_signup', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Create User model
const User = mongoose.model('User', {
    email: String,
    password: String
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve login.html
app.get('/reg_form', (req, res) => {
    res.sendFile(__dirname + '/reg_form.html');
});

/*
// Serve welcome.html
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});


// Serve signup.html
app.get('/reg', (req, res) => {
    res.sendFile(__dirname + '/reg.html');
});
*/
// Signup route
app.post('/reg_form', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    try {
        await user.save();
       // res.header('Content-Type', 'text/html');
     //res.send('Signup successful! Redirecting...');
     // Redirect to an external website after successful signup
     res.send('successfully');
    } catch (err) {
        res.status(400).send('Signup failed!');
    }
});

// Login route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email, password });
//         if (user) {
//             res.redirect('/project');
//         } else {
//             res.status(401).send('Invalid email or password');
//         }
//     } catch (err) {
//         res.status(400).send('Login failed!');
//     }
// });

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));