const dateElement = document.createElement("div");
const grandParent = document.querySelector("#displayBlocks");
const parent = document.createElement("div");
//create temp , wind ,description elemnts
const temp = document.createElement("div");
const iconImg = document.createElement("img");
const wind = document.createElement("div");
const description = document.createElement("div");
const humidity = document.createElement("div");
// function to display the weather data after getting reaponse by creating elements and appending data
const displayWeatherData = (response) => {
  console.log(response);

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

  parent.appendChild(temp);
  parent.appendChild(iconImg);
  parent.appendChild(description);
  parent.appendChild(wind);
  parent.appendChild(humidity);

  iconImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${nearestWeather.weather[0].icon}@2x.png`
  );
  iconImg.setAttribute("art", "Weather icon");
  temp.innerHTML = Math.floor(nearestWeather.main.temp - 273.15) + "\u00B0C";
  wind.innerHTML = `Wind speed: ${nearestWeather.wind.speed} m/s`;
  humidity.innerHTML = `humidity: ${nearestWeather.main.humidity}%`;

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
    const humidity = document.createElement("div");

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
    listParent.appendChild(humidity);

    wind.style.height = "40%";
    description.style.height = "40%";
    humidity.style.height = "40%";

    iconImg.style.width = "40%";
    iconImg.style.height = "40%";
    iconImg.style.padding = "0";
    dateElement.style.color = "beige";

    description.style.width = "100%";
    listParent.style.width = "40%";
    listParent.style.height = "58%";

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
    wind.innerHTML = `Wind speed: ${element.wind.speed} m/s`;
    humidity.innerHTML = "humidity: " + element.main.humidity + "%";

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
  parent.style.borderWidth = "25px";
  parent.style.backgroundColor = "#0f6780";
  parent.style.height = "100%";
  parent.style.width = "30%";
  parent.style.margin = "auto";
  parent.style.marginLeft = "80px";
  parent.style.padding = "20px";
  parent.style.display = "flex";
  parent.style.flexDirection = "column";
  parent.style.alignItems = "center";
  temp.style.alignSelf = "flex-start";
  temp.style.color = "yellow";
  parent.style.boxSizing = "border-box";
  parent.style.color = "white";
  parent.style.fontSize = "20px";
  temp.style.fontSize = "45px";
  temp.style.fontWeight = "500";

  parent.style.fontWeight = "400";
  iconImg.style.height = "40%";
  iconImg.style.position = "relative";
  iconImg.style.bottom = "10px";

  dateElement.style.fontWeight = "600";
  dateElement.style.color = "beige";
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
//input element and the error showing div
const inputDiv = document.getElementById("inputDiv");
const showError = document.createElement("div");
async function cityWeather() {
  try {
    const input = document.querySelector("#city");
    const city = input.value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0503daf19e9338ad914adf09e0e92fc6`
    );
    console.log(response);
    if (!response.ok) {
      showError.innerHTML = "";
      inputDiv.appendChild(showError);
      inputDiv.style.position = "relative";
      showError.style.position = "absolute";
      showError.style.right = "658px";
      showError.style.width = "170px";
      showError.style.color = "red";
      showError.style.fontWeight = "680";

      if (response.status == "400") {
        showError.innerHTML = "Please enter your city";
      }
      if (response.status == "404") {
        showError.innerHTML = "City not found";
      }
      throw new Error(`Http error:${response.status}-${response.statusText}`);
    }
    const responseJson = await response.json();
    displayWeatherData(responseJson);
    //dropdown save data in localstorage
    const cityArray = JSON.parse(localStorage.getItem("array")) || [];
    if (!cityArray.includes(city)) {
      cityArray.push(city);
    }
    localStorage.setItem("array", JSON.stringify(cityArray));
  } catch (error) {
    console.log(error);
  }
}

const inputElement = document.querySelector("#city");
const dropdown = document.createElement("div");
//dropdown event listener
inputElement.addEventListener("click", () => {
  showError.innerHTML = "";
  dropdown.innerHTML = "";
  console.log("a");
  const inputDiv = document.getElementById("inputDiv");
  inputDiv.style.position = "relative";
  dropdown.style.position = "absolute";
  dropdown.style.right = "658px";
  dropdown.style.zIndex = "10";
  dropdown.style.width = "170px";
  const citySaved = JSON.parse(localStorage.getItem("array")) || [];
  console.log(citySaved);
  citySaved.forEach((city) => {
    const eachCity = document.createElement("div");
    eachCity.innerHTML = city;

    dropdown.appendChild(eachCity);
    //add the value in each city to input field when selected by the user
    eachCity.addEventListener("click", () => {
      inputElement.value = eachCity.innerHTML;
    });
    //styling eachcity
    eachCity.style.borderWidth = "2px";
    eachCity.style.backgroundColor = "beige";
    eachCity.style.height = "56px";
    eachCity.style.padding = "5px 10px";
    eachCity.addEventListener("mouseover", () => {
      eachCity.style.backgroundColor = "#7f806a";
      eachCity.style.color = "white";
    });
    eachCity.addEventListener("mouseout", () => {
      eachCity.style.backgroundColor = "beige";
      eachCity.style.color = "black";
    });
  });
  inputDiv.appendChild(dropdown);
});
//when user clicks any place other than input clear the dropdown.here addevent listener is added to the whole document
document.addEventListener("click", (e) => {
  if (dropdown && !inputElement.contains(e.target)) {
    dropdown.innerHTML = "";
  }
});
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

//dynamic media queries in js file for ipad mini (768px width) and iphone SE(width 375px)
const mediaQuery1 = window.matchMedia("(max-width:768px)");
const mediaQuery2 = window.matchMedia("(max-width:375px)");

function applyMediaQueryStyles() {
  if (mediaQuery1.matches) {
    const label = document.querySelector("label");
    label.innerHTML = "Search: ";
    // function to display the weather data after getting reaponse by creating elements and appending data
    const displayWeatherData = (response) => {
      console.log(response);

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

      parent.appendChild(temp);
      parent.appendChild(iconImg);
      parent.appendChild(description);
      parent.appendChild(wind);
      parent.appendChild(humidity);

      iconImg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${nearestWeather.weather[0].icon}@2x.png`
      );
      iconImg.setAttribute("art", "Weather icon");
      temp.innerHTML =
        Math.floor(nearestWeather.main.temp - 273.15) + "\u00B0C";
      wind.innerHTML = `Wind speed: ${nearestWeather.wind.speed} m/s`;
      humidity.innerHTML = `humidity: ${nearestWeather.main.humidity}%`;

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
        const humidity = document.createElement("div");

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
        listParent.appendChild(humidity);

        wind.style.height = "10%";
        description.style.height = "10%";
        humidity.style.height = "10%";

        iconImg.style.width = "30%";
        iconImg.style.height = "40%";
        iconImg.style.padding = "0";
        dateElement.style.color = "beige";

        description.style.width = "100%";
        listParent.style.width = "100%";
        listParent.style.height = "58%";

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
        wind.innerHTML = `Wind speed: ${element.wind.speed} m/s`;
        humidity.innerHTML = "humidity: " + element.main.humidity + "%";

        const [year, month, day] = element.dt_txt.split(" ")[0].split("-");
        const date = `${day}-${month}-${year}`;
        dateElement.innerHTML = date;
        description.innerHTML = element.weather[0].description;
      });
      //styling the elements
      grandParent.style.overflow = "auto";
      grandParent.style.width = "100%";
      grandParent.style.display = "flex";
      grandParent.style.alignItems = "center";
      grandParent.style.height = "100%";
      listGrandParent.style.height = "600px";
      listGrandParent.style.display = "flex";
      listGrandParent.style.flexDirection = "column";
      listGrandParent.style.alignItems = "center";
      listGrandParent.style.width = "100%";
      listGrandParent.style.gap = "24px";

      //current day data styling
      parent.style.borderWidth = "25px";
      parent.style.backgroundColor = "#0f6780";
      parent.style.height = "500px";
      parent.style.width = "80%";
      parent.style.margin = " 5px auto 20px auto";
      parent.style.padding = "20px";
      parent.style.display = "flex";
      parent.style.flexDirection = "column";
      parent.style.alignItems = "center";
      temp.style.alignSelf = "flex-start";
      temp.style.color = "yellow";
      parent.style.boxSizing = "border-box";
      parent.style.color = "white";
      parent.style.fontSize = "20px";
      temp.style.fontSize = "45px";
      temp.style.fontWeight = "500";

      parent.style.fontWeight = "400";
      iconImg.style.height = "40%";
      iconImg.style.position = "relative";
      iconImg.style.bottom = "10px";

      dateElement.style.fontWeight = "600";
      dateElement.style.color = "beige";
      grandParent.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      parent.style.padding = "24px 0px";
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
          throw new Error(
            `http status:${response.status}-${response.statusText}`
          );
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
    //input element and the error showing div
    const inputDiv = document.getElementById("inputDiv");
    const showError = document.createElement("div");
    async function cityWeather() {
      try {
        const input = document.querySelector("#city");
        const city = input.value;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0503daf19e9338ad914adf09e0e92fc6`
        );
        console.log(response);
        if (!response.ok) {
          showError.innerHTML = "";
          inputDiv.appendChild(showError);
          inputDiv.style.position = "relative";
          showError.style.position = "absolute";
          showError.style.right = "658px";
          showError.style.width = "170px";
          showError.style.color = "red";
          showError.style.fontWeight = "680";

          if (response.status == "400") {
            showError.innerHTML = "Please enter your city";
          }
          if (response.status == "404") {
            showError.innerHTML = "City not found";
          }
          throw new Error(
            `Http error:${response.status}-${response.statusText}`
          );
        }
        const responseJson = await response.json();
        displayWeatherData(responseJson);
        //dropdown save data in localstorage
        const cityArray = JSON.parse(localStorage.getItem("array")) || [];
        if (!cityArray.includes(city)) {
          cityArray.push(city);
        }
        localStorage.setItem("array", JSON.stringify(cityArray));
      } catch (error) {
        console.log(error);
      }
    }

    const inputElement = document.querySelector("#city");
    const dropdown = document.createElement("div");
    //dropdown event listener
    inputElement.addEventListener("click", () => {
      showError.innerHTML = "";
      dropdown.innerHTML = "";
      console.log("a");
      const inputDiv = document.getElementById("inputDiv");
      inputDiv.style.position = "relative";
      dropdown.style.position = "absolute";
      dropdown.style.right = "658px";
      dropdown.style.zIndex = "10";
      dropdown.style.width = "170px";
      const citySaved = JSON.parse(localStorage.getItem("array")) || [];
      console.log(citySaved);
      citySaved.forEach((city) => {
        const eachCity = document.createElement("div");
        eachCity.innerHTML = city;

        dropdown.appendChild(eachCity);
        //add the value in each city to input field when selected by the user
        eachCity.addEventListener("click", () => {
          inputElement.value = eachCity.innerHTML;
        });
        //styling eachcity
        eachCity.style.borderWidth = "2px";
        eachCity.style.backgroundColor = "beige";
        eachCity.style.height = "56px";
        eachCity.style.padding = "5px 10px";
        eachCity.addEventListener("mouseover", () => {
          eachCity.style.backgroundColor = "#7f806a";
          eachCity.style.color = "white";
        });
        eachCity.addEventListener("mouseout", () => {
          eachCity.style.backgroundColor = "beige";
          eachCity.style.color = "black";
        });
      });
      inputDiv.appendChild(dropdown);
    });
    //when user clicks any place other than input clear the dropdown.here addevent listener is added to the whole document
    document.addEventListener("click", (e) => {
      if (dropdown && !inputElement.contains(e.target)) {
        dropdown.innerHTML = "";
      }
    });
    btnLocation.innerHTML = "Current Location";
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
  }
  if (mediaQuery2.matches) {
    const inputDiv = document.getElementById("inputDiv");
    inputDiv.setAttribute("placeholder", "search");
    const label = document.querySelector("label");
    label.style.display = "none";
    // function to display the weather data after getting reaponse by creating elements and appending data
    const displayWeatherData = (response) => {
      console.log(response);

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

      parent.appendChild(temp);
      parent.appendChild(iconImg);
      parent.appendChild(description);
      parent.appendChild(wind);
      parent.appendChild(humidity);

      iconImg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${nearestWeather.weather[0].icon}@2x.png`
      );
      iconImg.setAttribute("art", "Weather icon");
      temp.innerHTML =
        Math.floor(nearestWeather.main.temp - 273.15) + "\u00B0C";
      wind.innerHTML = `Wind speed: ${nearestWeather.wind.speed} m/s`;
      humidity.innerHTML = `humidity: ${nearestWeather.main.humidity}%`;

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
        const humidity = document.createElement("div");

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
        listParent.appendChild(humidity);

        wind.style.height = "10%";
        description.style.height = "10%";
        humidity.style.height = "10%";

        iconImg.style.width = "30%";
        iconImg.style.height = "40%";
        iconImg.style.padding = "0";
        dateElement.style.color = "beige";

        description.style.width = "100%";
        listParent.style.width = "100%";
        listParent.style.height = "58%";

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
        wind.innerHTML = `Wind speed: ${element.wind.speed} m/s`;
        humidity.innerHTML = "humidity: " + element.main.humidity + "%";

        const [year, month, day] = element.dt_txt.split(" ")[0].split("-");
        const date = `${day}-${month}-${year}`;
        dateElement.innerHTML = date;
        description.innerHTML = element.weather[0].description;
      });
      //styling the elements
      grandParent.style.overflow = "auto";
      grandParent.style.width = "100%";
      grandParent.style.display = "flex";
      grandParent.style.alignItems = "center";
      grandParent.style.height = "100%";
      listGrandParent.style.height = "600px";
      listGrandParent.style.display = "flex";
      listGrandParent.style.flexDirection = "column";
      listGrandParent.style.alignItems = "center";
      listGrandParent.style.width = "100%";
      listGrandParent.style.gap = "24px";

      //current day data styling
      parent.style.borderWidth = "25px";
      parent.style.backgroundColor = "#0f6780";
      parent.style.height = "300px";
      parent.style.width = "80%";
      parent.style.margin = " 5px auto 20px auto";
      parent.style.padding = "20px";
      parent.style.display = "flex";
      parent.style.flexDirection = "column";
      parent.style.alignItems = "center";
      temp.style.alignSelf = "flex-start";
      temp.style.color = "yellow";
      parent.style.boxSizing = "border-box";
      parent.style.color = "white";
      parent.style.fontSize = "20px";
      temp.style.fontSize = "45px";
      temp.style.fontWeight = "500";

      parent.style.fontWeight = "400";
      iconImg.style.height = "40%";
      iconImg.style.position = "relative";
      iconImg.style.bottom = "10px";

      dateElement.style.fontWeight = "600";
      dateElement.style.color = "beige";
      grandParent.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      parent.style.padding = "24px 0px";
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
          throw new Error(
            `http status:${response.status}-${response.statusText}`
          );
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
    //input element and the error showing div
    const showError = document.createElement("div");
    async function cityWeather() {
      try {
        const input = document.querySelector("#city");
        const city = input.value;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0503daf19e9338ad914adf09e0e92fc6`
        );
        console.log(response);
        if (!response.ok) {
          showError.innerHTML = "";
          inputDiv.appendChild(showError);
          inputDiv.style.position = "relative";
          showError.style.position = "absolute";
          showError.style.right = "658px";
          showError.style.width = "170px";
          showError.style.color = "red";
          showError.style.fontWeight = "680";

          if (response.status == "400") {
            showError.innerHTML = "Please enter your city";
          }
          if (response.status == "404") {
            showError.innerHTML = "City not found";
          }
          throw new Error(
            `Http error:${response.status}-${response.statusText}`
          );
        }
        const responseJson = await response.json();
        displayWeatherData(responseJson);
        //dropdown save data in localstorage
        const cityArray = JSON.parse(localStorage.getItem("array")) || [];
        if (!cityArray.includes(city)) {
          cityArray.push(city);
        }
        localStorage.setItem("array", JSON.stringify(cityArray));
      } catch (error) {
        console.log(error);
      }
    }

    const inputElement = document.querySelector("#city");
    const dropdown = document.createElement("div");
    //dropdown event listener
    inputElement.addEventListener("click", () => {
      showError.innerHTML = "";
      dropdown.innerHTML = "";
      console.log("a");
      const inputDiv = document.getElementById("inputDiv");
      inputDiv.style.position = "relative";
      dropdown.style.position = "absolute";
      dropdown.style.right = "658px";
      dropdown.style.zIndex = "10";
      dropdown.style.width = "170px";
      const citySaved = JSON.parse(localStorage.getItem("array")) || [];
      console.log(citySaved);
      citySaved.forEach((city) => {
        const eachCity = document.createElement("div");
        eachCity.innerHTML = city;

        dropdown.appendChild(eachCity);
        //add the value in each city to input field when selected by the user
        eachCity.addEventListener("click", () => {
          inputElement.value = eachCity.innerHTML;
        });
        //styling eachcity
        eachCity.style.borderWidth = "2px";
        eachCity.style.backgroundColor = "beige";
        eachCity.style.height = "56px";
        eachCity.style.padding = "5px 10px";
        eachCity.addEventListener("mouseover", () => {
          eachCity.style.backgroundColor = "#7f806a";
          eachCity.style.color = "white";
        });
        eachCity.addEventListener("mouseout", () => {
          eachCity.style.backgroundColor = "beige";
          eachCity.style.color = "black";
        });
      });
      inputDiv.appendChild(dropdown);
    });
    //when user clicks any place other than input clear the dropdown.here addevent listener is added to the whole document
    document.addEventListener("click", (e) => {
      if (dropdown && !inputElement.contains(e.target)) {
        dropdown.innerHTML = "";
      }
    });
    btnLocation.innerHTML = "";
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
  }
}

// Initial check on page load
applyMediaQueryStyles();

// Add listener for changes
mediaQuery1.addEventListener("change", (event) => {
  applyMediaQueryStyles(); // Reapply styles on change
});
mediaQuery2.addEventListener("change", (event) => {
  applyMediaQueryStyles(); // Reapply styles on change
});
