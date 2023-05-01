let response;
let search = document.getElementById("search");
let button = document.querySelector("button");
let body = document.querySelector('body');
let errorDisplay = document.querySelector('.error > span');
let container = document.getElementById('container');
let cityDisplay = document.querySelector('.cityDisplay');
let tempDisplay = document.querySelector('.tempDisplay');
let condition = document.querySelector('.condition');
let updated = document.querySelector('.updated');
let details = document.querySelector('.details');
let feelslike = document.querySelector('.feelslike');
let wind = document.querySelector('.wind');
let precipitation = document.querySelector('.precipitation');
let visibility = document.querySelector('.visibilty');
let currentData;
let f = 0;
const internetStatus = document.getElementById("internetStatus");
window.addEventListener('load', function (event) {
    detectInternet();
});
window.addEventListener('online', function (event) {
    detectInternet();
});
window.addEventListener('offline', function (event) {
    detectInternet();
});
function detectInternet() {
    if (navigator.onLine) {
        internetStatus.textContent = "You are back online";
        internetStatus.style.backgroundColor = "green";
        internetStatus.style.padding = "4px";
        setTimeout(reset, 5000);
    } else {
        internetStatus.style.display = "block";
        internetStatus.style.padding = "4px";
        console.log("Offline");
        internetStatus.textContent = "No Internet Connection";
        internetStatus.style.backgroundColor = "red";
    }
}
function reset() {
    internetStatus.style.display = "none";
}
body.style.backgroundImage = "url('images/home.jpg')";
button.addEventListener("click", () => {
    if (search.value == "") {
        errorDisplay.style.display = "block";
        errorDisplay.style.padding = "4px";
        printError("1");
    }
    else
        getData(search.value);
});
window.addEventListener('keydown', (k) => {
    if (k.key == 'Enter') {
        if (search.value == "") {
            errorDisplay.style.display = "block";
            errorDisplay.style.padding = "8px";
            printError("1");
        }
        else
            getData(search.value);
    }
})
async function getData(city) {
    try {
        response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=512ccd9efb394745a1a165910232804&q=${city}`,
            { mode: "cors" }
        );
        if (response.status === 400) {
            errorDisplay.style.display = "block";
            printError(400);
        }
        else {
            errorDisplay.style.display = "none";
            const Data = await response.json();
            currentData = Data.current;
            console.log(currentData);
            container.style.display = "flex";
            container.style.flexDirection = "column";
            City(Data);
            displayBackground(currentData.is_day);
            if (currentData.is_day == "0") {
                temp1Display(currentData.temp_c);
                container.style.color = "White";
            }
            else {
                temp1Display(currentData.temp_c);
                container.style.color = "Black";
            }
            image(currentData.condition.text, currentData.is_day);
            condition1(currentData.condition.text);
            updation(currentData.last_updated);
            feelsLike(currentData.feelslike_c);
            windDisplay(currentData.wind_mph, currentData.wind_degree, currentData.wind_dir, currentData.is_day);
            visibilityDisplay(currentData.vis_km);
            preciDisplay(currentData.precip_mm);
        }
    }
    catch (err) {
    }
}
function City(Data) {
    let name = document.querySelector('.cityDisplay > span')
    name.textContent = Data.location.name + ", " + Data.location.region;
}
function displayBackground(value) {
    // if (value == "Mist")
    if (value == 1)
        body.style.backgroundImage = "url('images/day.jpg')";
    else
        body.style.backgroundImage = "url('images/night.jpg')";
}
function temp1Display(temp) {
    let temp1 = document.querySelector('.tempDisplay > span')
    temp1.textContent = temp + `\u00B0`;
    let c = document.getElementById('c');
    let f = document.getElementById('f');
    c.textContent = "C";
    f.textContent = "F";
    c.style.fontWeight = "900";
    c.style.opacity = "1";
    f.style.fontWeight = "100";
    f.style.opacity = "0.7";
    c.addEventListener('click', () => {
        c.style.fontWeight = "900";
        f.style.fontWeight = "100";
        c.style.opacity = "1";
        f.style.opacity = "0.7";
        temp1.textContent = currentData.temp_c + `\u00B0`;
    })
    f.addEventListener('click', () => {
        f.style.fontWeight = "900";
        c.style.fontWeight = "100";
        f.style.opacity = "1";
        c.style.opacity = "0.7";
        temp1.textContent = currentData.temp_f + `\u00B0`;
    })
}
function image(value, time) {
    let img = document.getElementById('img');
    // img.style.filter = "invert(100%)";
    img.style.height = "100px";
    if (value == "Mist" && time == 1)
        img.src = "images/mist-day.svg";
    else if (value == "Mist" && time == 0)
        img.src = "images/mist-night.svg";
    else if (value == "Partly cloudy" && time == 0) {
        img.src = "images/cloud-moon.svg";
        img.style.filter = "invert(100%)";
    }
    else if (value == "Partly cloudy" && time == 1) {
        img.src = "images/cloud-sun.svg";
        img.style.filter = "invert(0%)";
    }
    else if (value == "Overcast" && time == 1) {
        img.src = "images/cloud-solid.svg";
        img.style.filter = "invert(0%)";
    }
    else if (value == "Overcast" && time == 0) {
        img.src = "images/cloud-solid.svg";
        img.style.filter = "invert(100%)";
    }
    else if (value == "Sunny" && time == 1) {
        img.src = "images/sun-solid.svg";
        img.style.filter = "invert(100%)";
    }
    else if (value == "Clear" && time == 0) {
        img.src = "images/clear.svg";
        img.style.filter = "invert(100%)";
    }
    else if (value == "Heavy rain" && time == 1) {
        img.src = "images/cloud-showers-heavy-solid.svg";
        img.style.filter = "invert(100%)";
    }
    else if (value == "Heavy rain" && time == 0) {
        img.src = "images/cloud-showers-heavy-solid.svg";
        img.style.filter = "invert(0%)";
    }
    else if (value == "Light rain" && time == 1) {
        img.src = "images/light-rain.svg";
        img.style.filter = "invert(0%)";
    }
    else if (value == "Light rain" && time == 0) {
        img.src = "images/light-rain.svg";
        img.style.filter = "invert(100%)";
    }
    else if (value == "Light snow" && time == 0) {
        img.src = "images/snowflake.svg";
        img.style.filter = "invert(100%)";
    }
    else if (value == "Light snow" && time == 1) {
        img.src = "images/snowflake-solid.svg";
        img.style.filter = "invert(0%)";
    }
}
function condition1(text) {
    let cond = document.querySelector('.condition > span');
    cond.textContent = text;
}
function updation(time) {
    let text = document.querySelector('.updated > span');
    text.textContent = "Updated as of " + time;
}
function feelsLike(temp) {
    let temp1 = document.querySelector('.feelslike > span')
    temp1.textContent = temp + `\u00B0`;
    let c1 = document.getElementById('c1');
    let f1 = document.getElementById('f1');
    c1.textContent = "C";
    f1.textContent = "F";
    c1.style.fontWeight = "900";
    f1.style.fontWeight = "100";
    c1.style.opacity = "1";
    f1.style.opacity = "0.7";
    c1.addEventListener('click', () => {
        c1.style.fontWeight = "900";
        f1.style.fontWeight = "100";
        c1.style.opacity = "1";
        f1.style.opacity = "0.7";
        temp1.textContent = currentData.feelslike_c + `\u00B0`;
    })
    f1.addEventListener('click', () => {
        f1.style.fontWeight = "900";
        c1.style.fontWeight = "100";
        f1.style.opacity = "1";
        c1.style.opacity = "0.7";
        temp1.textContent = currentData.feelslike_f + `\u00B0`;
    })
}
function windDisplay(wind, degree, dir, time) {
    let text = document.querySelector('.wind > span');
    let direction = document.getElementById('direction');
    let arrow = document.getElementById('arrow');
    arrow.style.transform = `rotate(${degree}deg)`;
    if (time == 0)
        arrow.style.filter = "invert(100%)";
    else
        arrow.style.filter = "invert(0%)";

    direction.textContent = degree + `\u00B0` + "(" + dir;
    text.textContent = wind;
    let mph = document.getElementById('mph');
    let kph = document.getElementById('kph');
    mph.textContent = "mph";
    kph.textContent = "kph";
    mph.style.fontWeight = "900";
    kph.style.fontWeight = "100";
    mph.style.opacity = "1";
    kph.style.opacity = "0.7";
    mph.addEventListener('click', () => {
        mph.style.fontWeight = "900";
        kph.style.fontWeight = "100";
        mph.style.opacity = "1";
        kph.style.opacity = "0.7";
        text.textContent = currentData.wind_mph;
    })
    kph.addEventListener('click', () => {
        kph.style.fontWeight = "900";
        mph.style.fontWeight = "100";
        kph.style.opacity = "1";
        mph.style.opacity = "0.7";
        text.textContent = currentData.wind_kph;
    })
}
function visibilityDisplay(visi) {
    let text = document.querySelector('.visibility > span');
    text.textContent = "Visibility: " + visi + " km";
}
function preciDisplay(preci) {
    let text = document.querySelector('.precipitation > span');
    text.textContent = "Precipitation: " + preci + " mm";
}
function printError(value) {
    errorDisplay.style.padding = "8px";
    if (value == "1")
        errorDisplay.textContent = "Please enter a place!";
    else {
        errorDisplay.textContent = `There was an error accessing the weather data for ${search.value}: 400 Not Found: ${search.value} not found`;
    }
}
