export async function getCountry(
  element,
  countryName,
  elementFlag,
  elementName,
  elementCapital,
  elementRegion,
  elementPopulation,
  elementLangauge,
  inputValue
) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (!response.ok) {
      throw new Error(`Data not available ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    element.textContent = err.message;
    setTimeout(() => {
      element.textContent = "";
    }, 5000);
    elementFlag.src = "";
    elementFlag.alt = "";
    elementName.textContent = "";
    elementCapital.textContent = "";
    elementRegion.textContent = "";
    elementPopulation.textContent = "";
    elementLangauge.textContent = "";
    inputValue.value = "";
    return null;
  }
}

export async function displayCountry(
  elementFlag,
  elementName,
  elementCapital,
  elementRegion,
  elementPopulation,
  elementLangauge,
  countryData,
  inputValue
) {
  if (countryData) {
    elementFlag.src = countryData[0].flags.png;
    elementFlag.alt = countryData[0].flags.alt;
    elementName.textContent = countryData[0].name.official;
    elementCapital.textContent = countryData[0].capital;
    elementRegion.textContent = countryData[0].region;
    elementPopulation.textContent = countryData[0].population.toLocaleString();
    elementLangauge.textContent = Object.values(
      countryData[0].languages || {}
    ).join(", ");
    inputValue.value = "";
  }
}
