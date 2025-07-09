// A mapping of country names (as used in countries.ts) to ISO 4217 currency codes.
const countryToCurrency: { [key: string]: string } = {
    'United States': 'USD',
    'United Kingdom': 'GBP',
    'Canada': 'CAD',
    'Australia': 'AUD',
    'Germany': 'EUR',
    'France': 'EUR',
    'Spain': 'EUR',
    'Italy': 'EUR',
    'Netherlands': 'EUR',
    'Ireland': 'EUR',
    'Belgium': 'EUR',
    'Austria': 'EUR',
    'Greece': 'EUR',
    'Portugal': 'EUR',
    'Finland': 'EUR',
    'India': 'INR',
    'China': 'CNY',
    'Japan': 'JPY',
    'South Korea': 'KRW',
    'Singapore': 'SGD',
    'Switzerland': 'CHF',
    'Sweden': 'SEK',
    'Norway': 'NOK',
    'Denmark': 'DKK',
    'New Zealand': 'NZD',
    'South Africa': 'ZAR',
    'Brazil': 'BRL',
    'Mexico': 'MXN',
    'Russia': 'RUB',
    'United Arab Emirates': 'AED',
    'Saudi Arabia': 'SAR',
    'Qatar': 'QAR',
    'Poland': 'PLN',
    'Turkey': 'TRY',
    'Israel': 'ILS',
    'Thailand': 'THB',
    'Malaysia': 'MYR',
    'Philippines': 'PHP',
    'Indonesia': 'IDR',
    'Vietnam': 'VND',
    'Nigeria': 'NGN',
    'Egypt': 'EGP',
    'Argentina': 'ARS',
    'Chile': 'CLP',
    'Colombia': 'COP',
    'Pakistan': 'PKR',
    'Bangladesh': 'BDT',
    'Ukraine': 'UAH',
    // Add more mappings as needed
};

// Default currency for locations not in the map or for generic locations
const DEFAULT_CURRENCY = 'USD';

export const getCurrencyForCountry = (country: string): string => {
    return countryToCurrency[country] || DEFAULT_CURRENCY;
};