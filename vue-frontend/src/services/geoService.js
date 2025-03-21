// src/services/geoService.js
import axios from 'axios';

export const detectUserCountry = async () => {
  try {
    // Using a free IP geolocation API
    const response = await axios.get('https://ipapi.co/json/');
    return response.data.country_code; // Returns 'PL', 'UA', etc.
  } catch (error) {
    console.error('Error detecting user country:', error);
    return null;
  }
};

export const mapCountryToLocale = (countryCode) => {
  const countryToLocaleMap = {
    'PL': 'pl',
    'UA': 'uk',
    // Add more countries as needed
  };
  
  return countryToLocaleMap[countryCode] || 'uk'; // Default to Ukrainian
};