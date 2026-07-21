const searchButton = document.querySelector("#search-location")
const searchInput = document.querySelector("#search-input")
const unitButton = document.querySelector("#unit-toggle")

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=JVYX4A4YC26XB3AQ3GY64JK8Z&contentType=json`)
        const data = await response.json();
        console.log(data)
        return data;

    } catch (error) {
        console.error("Failed to fetch data: ", error);
    }
}

function processWeatherData(data) {
    console.log(data);
    const condition = data.currentConditions.conditions
    const temp = data.currentConditions.temp;
    const apparentTemp = data.currentConditions.feelslike;
    const humidity = data.currentConditions.humidity;
    console.log(condition);
    console.log(temp);
    console.log(apparentTemp);
    console.log(humidity);
    return { condition, temp, apparentTemp, humidity}


}

searchButton.addEventListener('click', async () => {
    const weatherLocation = searchInput.value;
    console.log(weatherLocation);

    const data = await getWeatherData(weatherLocation);
    processWeatherData(data);
})
