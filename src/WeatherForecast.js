// function to display the weather data after getting reaponse
const displayWeatherData = (response) => {
  console.log(response);
  const dateElement = document.createElement("div");
  const parent = document.querySelector(".displayBlock");
  parent.innerHTML = "";
  parent.appendChild(dateElement);
  //convert to seconds
  const currentTime = new Date().getTime() / 1000;
  const currentDateItems = response.list.slice(0, 5);
  console.log(currentDateItems);
  const timeDifference = currentDateItems.map((element) => {
    const diff = element.dt - currentTime;
    return diff;
  });
  const lowestDifference = timeDifference.sort((a, b) => a - b)[0];
  console.log(timeDifference);
  console.log(lowestDifference);
  const closestTime = lowestDifference + new Date().getTime() / 1000;
  const nearestWeather = currentDateItems.filter((x) => {
    if (x.dt === closestTime) return true;
  })[0];
  console.log(nearestWeather);
  //create temp , wind ,description elemnts
  const temp = document.createElement("div");
  const wind = document.createElement("div");
  const description = document.createElement("div");
  parent.appendChild(temp);
  parent.appendChild(wind);
  parent.appendChild(description);

  temp.innerHTML = Math.floor(nearestWeather.main.temp - 273.15) + "\u00B0C";
  wind.innerHTML = nearestWeather.wind.speed + "m/s";
  description.innerHTML = nearestWeather.weather[0].description;

  //display list of next 5 days
  const uniqueDateData = response.list.filter((x) => {
    const dt = x.dt_txt.split(" ")[1];
    if (dt === "09:00:00") {
      return true;
    } else {
      return false;
    }
  });

  //clear first current day data
  uniqueDateData.shift();
  //loop through the array of unique day weather and create elements and add values
  uniqueDateData.forEach((element) => {
    const temp = document.createElement("div");
    const wind = document.createElement("div");
    const description = document.createElement("div");
    parent.appendChild(temp);
    parent.appendChild(wind);
    parent.appendChild(description);
    temp.innerHTML = Math.floor(element.main.temp - 273.15) + "\u00B0C";
    wind.innerHTML = element.wind.speed + "m/s";
    description.innerHTML = element.weather[0].description;
  });
};

//default cdisplay weather for Delhi
const defaultCity = async () => {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=0503daf19e9338ad914adf09e0e92fc6"
  );
  const responseJson = await response.json();
  displayWeatherData(responseJson);
};
defaultCity();
//get latitude and logitude at current location
function locationPromise() {
  const promise = new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    } else {
      reject(navigator.geolocation.getCurrentPosition);
    }
  });
  return promise;
}
//latitude and longitude access
let latitude;
let longitude;
async function locationPicker() {
  try {
    const promiseObj = await locationPromise();
    latitude = promiseObj.coords.latitude;
    longitude = promiseObj.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=0503daf19e9338ad914adf09e0e92fc6`
    );
    if (!response.ok) {
      throw new Error(`http status:${response.status}-${response.statusText}`);
    }
    const jsonObj = await response.json();
    return jsonObj;
  } catch (error) {
    console.log(error);
  }
}

//Get the button to location weather
const btnLocation = document.querySelector("#btnLocation");
btnLocation.addEventListener("click", () => {
  locationPicker().then((response) => {
    displayWeatherData(response);
  });
});

//city weather
const citybtn = document.querySelector("#btnCity");
citybtn.addEventListener("click", cityWeather);
async function cityWeather() {
  try {
    const input = document.querySelector("#city");
    const city = input.value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0503daf19e9338ad914adf09e0e92fc6`
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`Http error:${response.status}-${response.statusText}`);
    }
    const responseJson = await response.json();
    displayWeatherData(responseJson);
  } catch (error) {
    console.log(error);
  }
}
