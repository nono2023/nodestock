//stock marcket portfolio

const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;


//use body-Parser middleware
app.use(bodyParser.urlencoded({extended: false}));



// API key pk_fe1a2bf32e13467e98612f1048e56a6d
// create call API function
function call_api(finishedAPI, ticker){
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_fe1a2bf32e13467e98612f1048e56a6d', { json: true}, (err, res, body) => {
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

//set handlebar index GET routes
app.get('/', function(req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        });
    }, "tsla");
});

//set handlebar index POST routes
app.post('/', function(req, res) {
    call_api(function(doneAPI) {
            //posted_stuff = req.body.stock_ticker
            res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
});

// create about page route
app.get('/about.html', function(req, res) {
    res.render('about');
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));

