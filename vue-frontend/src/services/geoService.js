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

// New function for currency mapping
export const mapCountryToCurrency = (countryCode) => {
  const countryToCurrencyMap = {
    'PL': 'PLN', // Polish Złoty
    'UA': 'UAH', // Ukrainian Hryvnia
  };
  
  return countryToCurrencyMap[countryCode] || 'UAH'; // Default to Hryvnia
};

// New function to get currency symbol
export const getCurrencySymbol = (currencyCode) => {
  const currencySymbols = {
    'PLN': 'zł', // Polish Złoty
    'UAH': '₴',  // Ukrainian Hryvnia
  };
  
  return currencySymbols[currencyCode] || currencyCode;
};

// New function to initialize both language and currency based on location
export const initializeLocalization = async (i18n, setCurrency) => {
  const savedLocale = localStorage.getItem('userLocale');
  const savedCurrency = localStorage.getItem('userCurrency');
  
  // If user has already set preferences, use those
  if (savedLocale) {
    i18n.locale = savedLocale;
  }
  
  // If no saved preferences, detect location
  if (!savedLocale || !savedCurrency) {
    const countryCode = await detectUserCountry();
    
    if (countryCode) {
      // Set language if not already set
      if (!savedLocale) {
        const locale = mapCountryToLocale(countryCode);
        i18n.locale = locale;
        localStorage.setItem('userLocale', locale);
      }
      
      // Set currency if not already set
      if (!savedCurrency) {
        const currency = mapCountryToCurrency(countryCode);
        setCurrency(currency); // This would need to be passed in from your app
        localStorage.setItem('userCurrency', currency);
      }
    }
  }
  
  return {
    locale: i18n.locale,
    currency: savedCurrency || mapCountryToCurrency(await detectUserCountry()) || 'UAH'
  };
};