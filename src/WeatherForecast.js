// function to display the weather data after getting reaponse by creating elements and appending data
const displayWeatherData = (response) => {
  console.log(response);
  const dateElement = document.createElement("div");
  const grandParent = document.querySelector("#displayBlocks");
  const parent = document.createElement("div");
  grandParent.innerHTML = "";
  parent.appendChild(dateElement);
  grandParent.appendChild(parent);
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
  const closestTime = lowestDifference + currentTime;
  const nearestWeather = currentDateItems.filter((x) => {
    if (x.dt === closestTime) return true;
  })[0];
  console.log(nearestWeather);
  //create temp , wind ,description elemnts
  const temp = document.createElement("div");
  const iconImg = document.createElement("img");
  const wind = document.createElement("div");
  const description = document.createElement("div");
  parent.appendChild(temp);
  parent.appendChild(iconImg);
  parent.appendChild(description);
  parent.appendChild(wind);
  iconImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${nearestWeather.weather[0].icon}@2x.png`
  );
  iconImg.setAttribute("art", "Weather icon");
  temp.innerHTML = Math.floor(nearestWeather.main.temp - 273.15) + "\u00B0C";
  wind.innerHTML = `wind speed: ${nearestWeather.wind.speed} m/s`;
  //format date "2024-10-26 03:00:00" to 26-10-2024
  const [year, month, day] = nearestWeather.dt_txt.split(" ")[0].split("-");
  const date = `Today  : ${day}-${month}-${year}`;
  dateElement.innerHTML = date;
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
  const listGrandParent = document.createElement("div");
  uniqueDateData.forEach((element) => {
    const dateElement = document.createElement("div");
    const listParent = document.createElement("div");
    const temp = document.createElement("div");
    const iconImg = document.createElement("img");
    const wind = document.createElement("div");
    const description = document.createElement("div");
    iconImg.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`
    );
    iconImg.setAttribute("art", "Weather icon");
    listParent.appendChild(dateElement);
    listParent.appendChild(temp);
    listParent.appendChild(iconImg);
    listParent.appendChild(description);
    listParent.appendChild(wind);

    wind.style.height = "40%";
    description.style.height = "40%";

    iconImg.style.width = "40%";
    iconImg.style.height = "40%";
    iconImg.style.padding = "0";

    description.style.width = "100%";
    listParent.style.width = "40%";
    listParent.style.height = "48%";

    listParent.style.borderWidth = "20px";
    listParent.style.backgroundColor = "#0f6780";
    listParent.style.display = "flex";
    listParent.style.flexDirection = "column";
    listParent.style.justifyContent = "space-evenly";
    listParent.style.alignItems = "center";
    listParent.style.color = "white";

    listParent.style.fontSize = "20px";
    listParent.style.fontWeight = "400";
    temp.style.alignSelf = "flex-start";
    listParent.style.boxSizing = "border-box";
    listParent.style.padding = "12px 30px";
    temp.style.fontSize = "28px";
    listGrandParent.appendChild(listParent);
    grandParent.appendChild(listGrandParent);
    for (const child of listParent.children) {
      child.style.justifyContent = "center";
      child.style.alignItems = "center";

      child.style.display = "flex";
    }
    temp.innerHTML = Math.floor(element.main.temp - 273.15) + "\u00B0C";
    wind.innerHTML = `wind speed: ${element.wind.speed} m/s`;
    const [year, month, day] = element.dt_txt.split(" ")[0].split("-");
    const date = `${day}-${month}-${year}`;
    dateElement.innerHTML = date;
    description.innerHTML = element.weather[0].description;
  });
  //styling the elements
  for (const child of grandParent.children) {
    child.style.height = "150px";
  }

  grandParent.style.width = "100%";
  grandParent.style.display = "flex";
  grandParent.style.flexWrap = "wrap";
  grandParent.style.alignItems = "center";
  grandParent.style.height = "100%";
  listGrandParent.style.height = "100%";
  listGrandParent.style.flexWrap = "wrap";
  listGrandParent.style.alignItems = "center";
  listGrandParent.style.display = "flex";
  listGrandParent.style.width = "60%";
  listGrandParent.style.gap = "24px";

  //current day data styling
  parent.style.borderWidth = "45px";
  parent.style.backgroundColor = "#0f6780";
  parent.style.height = "70%";
  parent.style.width = "30%";
  parent.style.margin = "auto";
  parent.style.marginLeft = "80px";
  parent.style.paddingLeft = "20px";
  parent.style.display = "flex";
  parent.style.flexDirection = "column";
  parent.style.alignItems = "center";
  temp.style.alignSelf = "flex-start";
  parent.style.boxSizing = "border-box";
  parent.style.color = "white";
  parent.style.fontSize = "20px";
  temp.style.fontSize = "45px";
  parent.style.fontWeight = "400";
  iconImg.style.height = "40%";
  dateElement.style.fontWeight = "600";
  wind.style.marginTop = "14px";
  grandParent.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  grandParent.style.padding = "24px 0";
};

//default display weather for Delhi
const defaultCity = async () => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=0503daf19e9338ad914adf09e0e92fc6"
    );
    const responseJson = await response.json();
    displayWeatherData(responseJson);
  } catch (error) {
    console.log(error);
  }
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
btnLocation.addEventListener("mouseover", () => {
  btnLocation.style.borderWidth = "0px";
});
btnLocation.addEventListener("mouseout", () => {
  btnLocation.style.borderWidth = "2px";
});
citybtn.addEventListener("mouseover", () => {
  citybtn.style.borderWidth = "0px";
});
citybtn.addEventListener("mouseout", () => {
  citybtn.style.borderWidth = "2px";
});
