const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const cors = require('cors');

// Initialize Express
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Configure PostgreSQL connection
const sequelize = new Sequelize('basic3tier', 'postgres', 'admin123', {
    host: DB_HOST,
    dialect: 'postgres',
});

// Define User model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Create the table if it doesn't exist
sequelize.sync();

// API routes
// Create a new user
app.post('/api/user', async (req, res) => {
    try {
        const { name, email, age, address } = req.body;
        const user = await User.create({ name, email, age, address });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
});

// Get all users
app.get('/api/user', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Get a user by ID
app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// Update a user by ID
app.put('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age, address } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            user.name = name;
            user.email = email;
            user.age = age;
            user.address = address;
            await user.save();
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Delete a user by ID
app.delete('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            await user.destroy();
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// Start the Express server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
