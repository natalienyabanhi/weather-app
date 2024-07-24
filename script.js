document   
  .getElementById("location-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const locationForm = document.getElementById("location-form");
    const location = document.getElementById("location").value;
    const loadingElement = document.getElementById("loading");
    const resultElement = document.getElementById("result");
    const locationHeader = document.getElementById("location-header");

    // Show loading message
    loadingElement.style.display = "block";
    resultElement.innerHTML = "";

    // Make API call
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=cdce8a50e9444db2bcd123740241007&days=5&aqi=no&alerts=no&q=${location}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        
        arrayForecast = data?.forecast?.forecastday;
        
        console.log("arrayForecast", arrayForecast);
        
        populateTable(arrayForecast);

        locationHeader.innerHTML = location;

        // Hide loading message
        loadingElement.style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        // Hide loading message
        loadingElement.style.display = "none";

        // Display error message
        resultElement.innerHTML = "Error fetching data. Please try again.";
      });
  });
function populateTable(data) {
  const weatherCardParent = document.getElementById("weather-card-parent");
  const weatherReportParent = document.getElementById("weather-report-parent");
  const locationForm = document.getElementById("location-form");

  // Clear existing rows (if any)
  weatherCardParent.innerHTML = "";

  // Loop through each data item and create a row
  data.forEach((item) => {
    // Create a new div element for the weather card
    const weatherCard = document.createElement("div");
    weatherCard.className = "weather-card";

    // Populate the weather card with data
    weatherCard.innerHTML = `
        <div style="display: flex; align-items: center; flex-direction: column; justify-content: center; width: 100%" >
          <img src="${item?.day?.condition?.icon}" />
        </div>
        <span class="weather-header-style">${formatUserFriendlyDate(
          item?.date
        )}</span>
        <table class="weather-table-style">
          <tr>
            <td><span>Avg Temp ℃</span></td>
            <td>${item?.day?.avgtemp_c}</td>
          </tr>
          <tr>
            <td><span>Min Temp ℃</span></td>
            <td>${item?.day?.mintemp_c}</td>
          </tr>
          <tr>
            <td><span>Max Temp ℃</span></td>
            <td>${item?.day?.maxtemp_c}</td>
          </tr>
          <tr>
            <td><span>Condition</span></td>
            <td>${item?.day?.condition?.text}</td>
          </tr>
          <tr>
            <td><span>% Chance of Rain</span></td>
            <td>${item?.day?.daily_chance_of_rain}</td>
          </tr>
        </table>
      `;

    // Append the weather card to the parent element
    weatherCardParent.appendChild(weatherCard);
    weatherReportParent.style.display = "block";
    locationForm.style.display = "none";
  });
}

function formatUserFriendlyDate(inputDate) {
  // Parse the input date string into a Date object
  const date = new Date(inputDate);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date according to the options
  return date.toLocaleDateString("en-US", options);
}

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", function () {
  const weatherReportParent = document.getElementById("weather-report-parent");
  const locationForm = document.getElementById("location-form");

  locationForm.style.display = "flex";
  weatherReportParent.style.display = "none";
});

