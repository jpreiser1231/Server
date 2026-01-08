const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());
const port = 3000;

const message = "Hello!!";

app.get("/", (req, res) => {
    res.json({
        data: message
    });
});
const users = [];

app.post("/", (req, res) => {
    const{name, password} = req.body;
    if(!name || !password){
        return res.status(400).send('Name and password are required');
    }

    let nextUserId;
    const newUser = {id: nextUserId, name, password};
    users.push(newUser);
    console.log('New User Created: ', newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const{name, password} = req.body;

    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex === -1){
        return res.status(404).send('User Not Found');
    }

    users[userIndex] = { ...users[userIndex], name, password};
    console.log('User updated: ', users[userIndex]);
    res.status(200).json(users[userIndex]);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})