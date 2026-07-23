// Im putting all the elemetns here cuz its clean
const searchButton = document.querySelector("#search-location")
const searchInput = document.querySelector("#search-input")
const unitButton = document.querySelector("#unit-toggle")

const cityElement = document.querySelector(".city")
const tempElement = document.querySelector(".temp")
const weatherConditionElement = document.querySelector(".weather-condition")
const humidityElement = document.querySelector(".humidity")
const apparentTempElement = document.querySelector(".apparent-temp")

let tempUnit = "F"
let weatherData = null;


async function init() { // Will put a loading screen or loading spinner here soon
    displayWeather();
}
init();

searchButton.addEventListener('click', async () => {
    displayWeather();
})
    
unitButton.addEventListener('click', () => {
    toggleTempUnit();
})

// TODO: Store all these function in a Module file then import it here
// This is fucking messy and hard to write

async function getWeatherData(location) {
    try {

        const API_KEY = `JVYX4A4YC26XB3AQ3GY64JK8Z`
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}&contentType=json`)
        
        // console.log(`Connect API success:`, response.status);
        if (!response.ok) {
            throw new Error("City not found!");
        }
        const data = await response.json();
        // console.log(data)

        return  processWeatherData(data); // I really spent hours because I forgot to return ts function bruh
        
    } catch (error) {
        console.error(error);
        alert("Invalid location")
        return null;
    }
}

// Need to clean this shit up
// UPDATE: Cleaned.

function processWeatherData(data) {
    // console.log(data);
    const address = data.address;
    const condition = data.currentConditions.conditions;
    const temp = data.currentConditions.temp;
    const apparentTemp = data.currentConditions.feelslike;
    const humidity = data.currentConditions.humidity;

    /*
    console.log(`Address: ${address}, 
                Condition: ${condition}, 
                Temperature: ${temp}, 
                Apparent Temperature: ${apparentTemp}, 
                Humidity: ${humidity}`);
    */

    return { address, condition, temp, apparentTemp, humidity};    
}

async function displayWeather() {
    let weatherLocation = searchInput.value;
    if (!weatherLocation) {
        weatherLocation = `Tokyo`;
    }
    console.log(weatherLocation);
    weatherData = await getWeatherData(weatherLocation); // REMEMBER: this func return an object

    /* NOTE TO SELF 
    (data === null will ONLY check if its null)
    use (!data) for board check (null, undefined, 0, " ", false, NaN)

    But since I return null in catch error, ig thats fine
    */
    if (!weatherData) {
        return;
    }
    // console.log({ address, condition, temp, apparentTemp, humidity});

    /*
    console.log(`Address: ${address}, 
                Condition: ${condition}, 
                Temperature: ${temp}, 
                Apparent Temperature: ${apparentTemp}, 
                Humidity: ${humidity}`);
    */
    updateWeatherInfo(weatherData);
}

function updateWeatherInfo(data) {
    const { address, condition, temp, apparentTemp, humidity} = weatherData;

    cityElement.textContent = `${address}`;
    tempElement.textContent = `${convertTemp(temp)}°${tempUnit}`;
    weatherConditionElement.textContent = `${condition}`;
    apparentTempElement.textContent = `${convertTemp(apparentTemp)}°${tempUnit}`;
    humidityElement.textContent = `${humidity}%`;
}

function toggleTempUnit() {
    if (tempUnit === "F") {
        tempUnit = "C";
    } else {
        tempUnit = "F";
    }
    console.log(`Current Temperature Unit: ${tempUnit}`);

    if (weatherData) {
        updateWeatherInfo(weatherData); // My dumbass kept calling displayWeather() and waste the API
    }
}

function convertTemp(temp) {
    if (tempUnit === "F") {
        return temp;
    }

    return ((temp - 32) * 5 / 9).toFixed(1);
}