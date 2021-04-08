const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// set handlebars middlewares
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

//set handlebar routes
app.get('/', function(req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));

