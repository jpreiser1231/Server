const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());
const port = 3000;


app.get("/", (req, res) => {
    res.json({
        data: users
    });
});
const users = [];

app.post("/", (req, res) => {
    const{usernameInput, passwordInput} = req.body;
    if(!usernameInput || !passwordInput){
        return res.status(400).send('Name and password are required');
    }


    const newUser = {usernameInput, passwordInput};
    users.push(newUser);
    console.log('New User Created: ', newUser);
    res.status(201).json(users);
});

app.put('/:index', (req, res) => {
    const userIndex = parseInt(req.params.index);
    const{usernameInput, passwordInput} = req.body;


    if(userIndex === -1){
        return res.status(404).send('User Not Found');
    }

    users[userIndex] = {usernameInput, passwordInput};
    console.log('User updated: ', users);
    res.status(200).json(users);
});

app.delete('/:index', (req, res) => {
    const userIndex = parseInt(req.params.index);


    if(userIndex === -1){
        return res.status(404).send('User Not Found');
    }

    users.splice(userIndex, 1);
    console.log('User updated: ', users);
    res.status(200).json(users);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})