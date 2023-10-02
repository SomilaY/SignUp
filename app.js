const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB 
mongoose.connect('mongodb+srv://SomilaY:Thekingishere16@somilacluster.kul1amk.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a User schema
const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  password: String, // Store hashed passwords
  email: String,
});

const User = mongoose.model('User', userSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    // Validate the required fields
    const { name, surname, username, password, email } = req.body;
    if (!name || !surname || !username || !password || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Sanitize input data
    const sanitizedUser = {
      name: name.trim(),
      surname: surname.trim(),
      username: username.trim(),
      password: hashedPassword, // Store the hashed password
      email: email.trim().toLowerCase(),
    };

    // Create a new user with sanitized data
    const user = new User(sanitizedUser);
    
    // Save the user to the database
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// API endpoint for user sign-in
app.post('/signin', async (req, res) => {
  try {
    // Validate the required fields
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Sign-in successful' });
  } catch (error) {
    res.status(500).json({ error: 'Sign-in failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
