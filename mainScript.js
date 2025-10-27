import {
  countryInputElement,
  searchCountryElement,
  countryFlagElement,
  countryNameElement,
  countryCapitalElement,
  countryRegionElement,
  countryPopulationElement,
  countryLanguagesElement,
  errorElement,
} from "./elements.js";

import { getCountry, displayCountry } from "./functions.js";

searchCountryElement.addEventListener("click", async () => {
  if (countryInputElement.value.trim()) {
    const data = await getCountry(
      errorElement,
      countryInputElement.value,
      countryFlagElement,
      countryNameElement,
      countryCapitalElement,
      countryRegionElement,
      countryPopulationElement,
      countryLanguagesElement,
      countryInputElement
    );
    await displayCountry(
      countryFlagElement,
      countryNameElement,
      countryCapitalElement,
      countryRegionElement,
      countryPopulationElement,
      countryLanguagesElement,
      data,
      countryInputElement
    );
  }
});
