const express = require('express');
const bodyParser = require('body-parser');
const temperature = require('./model/temperature');
const moment = require('moment-timezone');


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route for rendering the temperatures.ejs template
app.get('/temperatures', (req, res) => {
    // Assuming you have temperature data to pass to the template
    const temperatures = [25, 30, 35]; // Example data
    res.render('temperatures', { temperatures });
});

// Route GET "/convert/celsius-to-fahrenheit"
app.get('/convert/celsius-to-fahrenheit', (req, res) => {
    const { celsius } = req.query;
    const celsiusValue = parseFloat(celsius);
    if (isNaN(celsiusValue)) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    const fahrenheit = temperature.convertToFahrenheit(celsiusValue);
    res.json({ fahrenheit });
});

// Route GET "/temperatures/api/:heure"
app.get('/temperatures/api/:heure', (req, res) => {
    const { heure } = req.params;

    // Validation de l'heure
    if (!temperature.isValidHourFormat(heure)) {
        res.status(404).json({ message: 'Heure invalide' });
        return;
    }

    // Logique pour obtenir la température correspondante
    const temperatureValue = temperature.getTemperature(heure);
    const heure_actuelle = new Date().getHours();

    // Formater la température en fonction de l'unité métrique (celsius par défaut)
    let metric = 'C';
    let temperatureFormatted = temperatureValue;

    // Vérifier si l'unité métrique est spécifiée dans le query string
    if (req.query.metric && req.query.metric.toUpperCase() === 'F') {
        temperatureFormatted = temperature.convertToFahrenheit(temperatureValue);
        metric = 'F';
    }

    // Réponse JSON avec les données demandées
    const response = {
        heure_actuelle,
        index: heure,
        temperature: temperatureFormatted,
        metric
    };

    res.json(response);
});



app.get('/temperatures/api2', (req, res) => {
    const { from, to, avg, metric } = req.query;

    // Mock temperature data for demonstration (replace with your actual data retrieval logic)
    const temperatureData = [20, 25, 30, 35, 40, 45, 50];

    // Check if "from" and "to" parameters are provided and valid
    let startIndex = parseInt(from);
    let endIndex = parseInt(to);

    if (isNaN(startIndex) || isNaN(endIndex) || startIndex < 0 || endIndex >= temperatureData.length || startIndex > endIndex) {
        res.status(400).json({ error: 'Invalid from/to parameters' });
        return;
    }

    // Slice the temperature data based on "from" and "to" indices
    let slicedData = temperatureData.slice(startIndex, endIndex + 1);

    // Calculate average if "avg" parameter is present
    if (avg === 'true') {
        const sum = slicedData.reduce((acc, val) => acc + val, 0);
        const average = sum / slicedData.length;
        slicedData = slicedData.map(temp => average);
    }

    // Convert temperatures to Fahrenheit if "metric" is specified as "F"
    if (metric && metric.toUpperCase() === 'F') {
        slicedData = slicedData.map(temp => (temp * 1.8) + 32);
    }

    // Response JSON with the requested data
    const response = {
        data: slicedData,
        metric: metric ? metric.toUpperCase() : 'C' // Default metric is Celsius
    };

    res.json(response);
});


app.get('/temperatures/api2', (req, res) => {
    // Your route handler logic here
    res.send('This is /temperatures/api2');
});






// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
