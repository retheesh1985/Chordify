const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Creates a new user.
app.post('/users', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewUser(request.body);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Fetches a list of all users.
app.get('/users', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllUsers();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

// Fetches a single user by ID.
app.get('/users/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getUSerById(id);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

// Updates an existing user by ID.
app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.updateUserById(id, request.body);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

// Deletes a user by ID.
app.delete('/users/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteUserById(id);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

// Schedule a cron job to run every day at 12:00 AM
cron.schedule('0 0 * * *', () => {
    const db = dbService.getDbServiceInstance();
    const result = db.CheckNewUSersInDay();
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
}, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
});


app.listen(process.env.PORT, () => console.log('app is running'));