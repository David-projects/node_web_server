const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Error writing to file.');
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('mant.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('welcome.hbs',{
    title:'About Page',
    welcomeMessage:'hello hello'
})
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        title:'About Page',
        welcomeMessage:'hello you'
});
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs',{
    title:'Projects Page',
    welcomeMessage:'My Projects'
});
});

app.get('/bad', (req,res) => {
    res.send({
    code:404,
    errorMessage:'Unable to get data.'
});
});

app.listen(3000,() => {
    console.log('Server is up on port 3000');
});