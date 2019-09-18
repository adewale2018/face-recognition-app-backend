const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const database = {
  users: [
    { 
      id: '123', 
      name: 'wale', 
      email: 'wale@gmail.com', 
      password: 'wale123', 
      entries: 0, 
      joined: new Date()
    },
    { 
      id: '124', 
      name: 'dammy', 
      email: 'dammy@gmail.com', 
      password: 'dammy124', 
      entries: 0, 
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.json(database.users);
});

app.post('/signin', (req, res) => {
  if((req.body.name === database.users[0].name) && (req.body.email === database.users[0].email)) {
    res.json('Success');
  } else {
    res.status(400).json('Error signning in');
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.status(200).json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if(!found) {
    res.status(400).json('Sorry, the user does not exist');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    }
  })
  if(!found) {
    res.status(400).json('Sorry, something went wrong!');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`APP is listening at PORT:: ${PORT}`);
});
