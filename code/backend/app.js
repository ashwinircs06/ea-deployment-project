const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using promise-based API
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a function to initialize database connection
async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });

        console.log('Connected to MySQL database');

        // Check if user table exists, create it if not
        const [rows, fields] = await connection.execute("SHOW TABLES LIKE 'users'");
        if (rows.length === 0) {
            // User table does not exist, create it
            const createUserTableQuery = `
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    fullname VARCHAR(255),
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    gender VARCHAR(10),
                    dateofbirth DATE
                )
            `;

            await connection.execute(createUserTableQuery);
            console.log('User table created');

            const insertUserQuery = `
                INSERT INTO users (username, fullname, password, email, gender, dateofbirth)
                VALUES ('john_doe', 'John Doe', 'password123', 'john@example.com', 'Male', '1990-01-01');
            `;

            await connection.execute(insertUserQuery);
            console.log('User inserted');
        } else {
            console.log('User table already exists');
        }

        return connection;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

// Initialize database connection
let pool;

initializeDatabase()
    .then(connection => {
        pool = connection;
        // Routes
        // User Signup
        app.post('/signup', async (req, res) => {
            try {
                const { username, fullname, email, password, gender, dateofbirth } = req.body;
                const [result, fields] = await pool.execute('INSERT INTO users (username, fullname, email, password, gender, dateofbirth) VALUES (?, ?, ?, ?, ?, ?)', [username, fullname, email, password, gender, dateofbirth]);
                res.status(200).send('User registered successfully');
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // User Login
        app.post('/login', async (req, res) => {
            try {
                const { email, password } = req.body;
                const [rows, fields] = await pool.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
                if (rows.length > 0) {
                    const id = rows[0].id;
                    res.status(200).json(id);
                } else {
                    res.status(401).send('Invalid email or password');
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // Get User by ID
        app.get('/user/:id', async (req, res) => {
            try {
                const userId = req.params.id;
                const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
                if (rows.length > 0) {
                    res.status(200).json(rows[0]);
                } else {
                    res.status(404).send('User not found');
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // Update User by ID
        app.put('/user/:id', async (req, res) => {
            try {
                const userId = req.params.id;
                const { username, fullname, email, gender, dateofbirth } = req.body;
                const [result, fields] = await pool.execute('UPDATE users SET username = ?, fullname = ?, email = ?, gender = ?, dateofbirth = ? WHERE id = ?', [username, fullname, email, gender, dateofbirth, userId]);
                res.status(200).send('User updated successfully');
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Failed to initialize database:', error);
    });
