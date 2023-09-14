const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('./views', 'views');
app.set('view engine', 'ejs')
app.use(express.static('./public'));
const datajson = require('./data/contacts.json');
app.use(bodyParser.urlencoded({ extended:false }));
// Load contacts from JSON file
let contacts = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf8'));

// index file
app.get('/', (req, res) => {
    res.render('index', { contacts });
});
// render add form
app.get('/add', (req, res) => {
    res.render('add', { datajson });
});
//post form data to json file
app.post('/add', (req, res) => {
    const contact = req.body;
    contacts.push(contact);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/');
});
// view file
app.get('/view/:id', (req, res) =>{ 
    let id = req.params.id;
    const contact = contacts[id];
    res.render('view', { contact });
});
// app.get(): edit
app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    const contact = contacts[id];
    res.render('edit', { id, contact});
});
// app.post(): edit
app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    contacts[id] = req.body;
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/');
});
// delete function
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    contacts.splice(id, 1);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/');
});


// app.listen()
app.listen(port, () =>{
    console.log('Server is running on port: ', port);
});