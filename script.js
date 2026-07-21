async function getData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=JVYX4A4YC26XB3AQ3GY64JK8Z&contentType=json`)
    const data = await response.json();
    console.log(data)
    return data;
}


