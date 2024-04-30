// Example functions
function convertToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}



// Fonction pour vérifier si l'heure est au bon format
function isValidHourFormat(heure) {
    // Expression régulière pour vérifier le format de l'heure (12 heures ou 24 heures)
    const regex = /^(0?[1-9]|1[0-2]|2[0-3])([AaPp][Mm])?$/;
    return regex.test(heure);
}


// Fonction pour obtenir la température correspondante à l'heure donnée
function getTemperature(heure) {
    // Obtenir l'heure actuelle (au format 24 heures)
    const currentHour = new Date().getHours();

    // Vérifier si l'heure fournie est valide et correspond à l'heure actuelle
    if (heure === currentHour || heure === (currentHour % 12)) {
        // Générer une température aléatoire entre 10°C et 30°C
        return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    } else {
        // Si l'heure fournie n'est pas valide ou ne correspond pas à l'heure actuelle, retourner -1
        return -1;
    }
}


module.exports = {
    convertToFahrenheit,
    convertToCelsius,
    isValidHourFormat,
    getTemperature,

};
