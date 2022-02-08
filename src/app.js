const path = require('path'); // node path core module
const express = require('express'); // node express npm module  => npm i express
const hbs = require('hbs'); // node hbs npm module  => npm i hbs
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('title', 'My NodeJs App');

// set view engine => handlebars
app.set('view engine', 'hbs');

// set views path
app.set('views', viewsPath);

// set partial views path
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicPath));

// routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Romi Pane',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Romi Pane',
        image: './img/pic.png',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Please fix the bug',
        name: 'Romi Pane',
    });
});

app.get('/weather', (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.send({
            error: 'Please Provide Location',
        });
    }

    geoCode(location, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }

        forecast(latitude, longitude, (error, forecast = undefined) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                placeName,
                forecast,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        message: 'Help article not found',
        name: 'Romi Pane',
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term',
        });
    }

    return res.send({
        products: [],
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        message: 'Page not found',
        name: 'Romi Pane',
    });
});

// start the server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
