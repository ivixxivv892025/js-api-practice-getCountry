import { fetchCountryData } from "./functions.js";

const countryInputElement = document.getElementById("countryInput");
const searchCountryElement = document.getElementById("searchBtn");
const countryFlagElement = document.getElementById("flagImg");
const countryNameElement = document.getElementById("countryName");
const countryCapitalElement = document.getElementById("capital");
const countryRegionElement = document.getElementById("region");
const countryPopulationElement = document.getElementById("population");
const countryLanguagesElement = document.getElementById("languages");
const errorElement = document.querySelector(".footer-left");

function displayCountry(countryData) {
  const country = countryData[0];

  countryFlagElement.src = country.flags.png;
  countryFlagElement.alt =
    country.flags.alt || `Flag of ${country.name.common}`;
  countryNameElement.textContent = country.name.official;

  countryCapitalElement.textContent = Array.isArray(country.capital)
    ? country.capital.join(", ")
    : country.capital || "N/A";

  countryRegionElement.textContent = country.region;
  countryPopulationElement.textContent = country.population.toLocaleString();

  countryLanguagesElement.textContent = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
}

function clearDisplay() {
  countryFlagElement.src = "";
  countryFlagElement.alt = "";
  countryNameElement.textContent = "—";
  countryCapitalElement.textContent = "—";
  countryRegionElement.textContent = "—";
  countryPopulationElement.textContent = "—";
  countryLanguagesElement.textContent = "—";
}

function showError(message, duration = 5000) {
  errorElement.textContent = message;
  setTimeout(() => {
    errorElement.textContent = "";
  }, duration);
}

async function handleSearch() {
  const countryName = countryInputElement.value.trim();

  if (!countryName) {
    showError("Please enter a country name");
    return;
  }

  try {
    const data = await fetchCountryData(countryName);
    displayCountry(data);
    countryInputElement.value = "";
  } catch (err) {
    showError(err.message);
    clearDisplay();
  }
}

searchCountryElement.addEventListener("click", handleSearch);

countryInputElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
