//stock marcket portfolio

const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;

// API key pk_fe1a2bf32e13467e98612f1048e56a6d
// create call API function
function call_api(finishedAPI){
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_fe1a2bf32e13467e98612f1048e56a6d', { json: true}, (err, res, body) => {
    if (err) { return console.log(err);}
    if (res.statusCode === 200){
        finishedAPI(body)
    };
});
};





// set handlebars middlewares
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

//set handlebar routes
app.get('/', function(req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        });
    });
});

// create about page route
app.get('/about.html', function(req, res) {
    res.render('about');
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));

