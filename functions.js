export async function fetchCountryData(countryName) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  );

  if (!response.ok) {
    throw new Error(`Country not found (Status: ${response.status})`);
  }

  return response.json();
}
