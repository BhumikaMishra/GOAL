// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/organdonation', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define MongoDB schema
const organDonorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  // Add more fields as needed
});

// Create MongoDB model
const OrganDonor = mongoose.model('OrganDonor', organDonorSchema);

// Express middleware to parse JSON bodies
app.use(express.json());

// Express route to handle form submissions
app.post('/submitForm', async (req, res) => {
  try {
    // Create a new document using the submitted data
    const newDonor = new OrganDonor({
      firstName: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      // Map other fields similarly
    });

    // Save the document to the database
    await newDonor.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'An error occurred while submitting the form' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
