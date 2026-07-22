// Im putting all the elemetns here cuz its clean
const searchButton = document.querySelector("#search-location")
const searchInput = document.querySelector("#search-input")
const unitButton = document.querySelector("#unit-toggle")

const cityElement = document.querySelector(".city")
const tempElement = document.querySelector(".temp")
const weatherConditionElement = document.querySelector(".weather-condition")
const humidityElement = document.querySelector(".humidity")
const apparentTempElement = document.querySelector(".apparent-temp")

searchButton.addEventListener('click', async () => {
    const weatherLocation = searchInput.value;
    console.log(weatherLocation);
    const data = await getWeatherData(weatherLocation);
    const { address, condition, temp, apparentTemp, humidity} = data;
    // console.log({ address, condition, temp, apparentTemp, humidity});

    console.log(`Address: ${address}, 
                Condition: ${condition}, 
                Temperature: ${temp}, 
                Apparent Temperature: ${apparentTemp}, 
                Humidity: ${humidity}`);

    cityElement.textContent = address;
    tempElement.textContent = `${temp}°F`;
    weatherConditionElement.textContent = condition;
    apparentTempElement.textContent = `${apparentTemp}°F`;
    humidityElement.textContent = `${humidity}%`;

})

async function getWeatherData(location) {
    try {
        const API_KEY = `JVYX4A4YC26XB3AQ3GY64JK8Z`
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}&contentType=json`)
        const data = await response.json();
        // console.log(data)

        return  processWeatherData(data); // I really spent hours because I forgot to return ts function bruh
        
    } catch (error) {
        console.error("Failed to fetch data: ", error);
    }



}
// Need to clean this shit up
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


