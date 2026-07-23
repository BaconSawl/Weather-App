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

searchButton.addEventListener('click', async () => {
    displayWeather();
})

unitButton.addEventListener('click', () => {
    toggleTempUnit();
})

async function getWeatherData(location) {
    try {

        const API_KEY = `JVYX4A4YC26XB3AQ3GY64JK8Z`
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}&contentType=json`)
        
        console.log(response.status);
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
    const temp = convertTemp(data.currentConditions.temp) ;
    const apparentTemp = convertTemp(data.currentConditions.feelslike);
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
    const weatherLocation = searchInput.value;
    console.log(weatherLocation);
    const weatherData = await getWeatherData(weatherLocation); // REMEMBER: this func return an object

    /* NOTE TO SELF 
    (data === null will ONLY check if its null)
    use (!data) for board check (null, undefined, 0, " ", false, NaN)

    But since I return null in catch error, ig thats fine
    */
    if (!weatherData) {
        return;
    }

    const { address, condition, temp, apparentTemp, humidity} = weatherData;
    // console.log({ address, condition, temp, apparentTemp, humidity});

    console.log(`Address: ${address}, 
                Condition: ${condition}, 
                Temperature: ${temp}, 
                Apparent Temperature: ${apparentTemp}, 
                Humidity: ${humidity}`);

    cityElement.textContent = address;
    tempElement.textContent = `${temp}°${tempUnit}`;
    weatherConditionElement.textContent = condition;
    apparentTempElement.textContent = `${apparentTemp}°${tempUnit}`;
    humidityElement.textContent = `${humidity}%`;
}

function toggleTempUnit() {
    if (tempUnit === "F") {
        tempUnit = "C";
    } else {
        tempUnit = "F";
    }
    console.log(tempUnit);

    if (tempElement) {
        displayWeather();
    }
}

function convertTemp(temp) {
    if (tempUnit === "F") {
        return temp;
    }

    return ((temp - 32) * 5 / 9).toFixed(1);
}