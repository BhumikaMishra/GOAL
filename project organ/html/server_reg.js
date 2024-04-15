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

// Signup route
app.post('/reg_form', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    try {
        await user.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Signup failed!' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
