/**
 * Utility functions for handling missing data with professional fallback values
 */

// Fallback values for different data types
const FALLBACK_VALUES = {
  STRING: 'N/A',
  ADDRESS: 'Address not available',
  PHONE: 'Phone number not available',
  WEBSITE: 'Website not available',
  DISTANCE: 'Distance not available',
  CATEGORY: 'Category not available',
  NAME: 'Unknown Place',
  LOCATION: 'Location not specified',
};

/**
 * Returns a fallback-safe value for potentially undefined/null data
 * @param value The value to check
 * @param fallbackType The type of fallback to use
 * @param customFallback Custom fallback value if needed
 * @returns A safe value with proper fallback
 */
export function safeDataValue(
  value: string | number | undefined | null,
  fallbackType: keyof typeof FALLBACK_VALUES = 'STRING',
  customFallback?: string
): string {
  if (value === undefined || value === null || value === '') {
    return customFallback || FALLBACK_VALUES[fallbackType] || FALLBACK_VALUES.STRING;
  }
  
  // For distance, we might have a number that needs formatting
  if (typeof value === 'number') {
    if (fallbackType === 'DISTANCE') {
      return `${value.toFixed(0)} m`;
    }
    return value.toString();
  }
  
  return value.toString();
}

/**
 * Safely extracts the domain from a URL with fallback handling
 * @param url The URL to extract domain from
 * @returns The domain or a fallback value
 */
export function safeExtractDomain(url: string | undefined): string {
  if (!url) {
    return safeDataValue(undefined, 'WEBSITE');
  }
  
  try {
    const hostname = new URL(url).hostname;
    // Remove 'www.' if it exists
    return hostname.replace(/^www\./, "");
  } catch (error) {
    return safeDataValue(undefined, 'WEBSITE');
  }
}

/**
 * Safely formats address components
 * @param location The location object
 * @returns A formatted address string with fallback handling
 */
export function safeFormatAddress(location: {
  address?: string;
  locality?: string;
  region?: string;
  country?: string;
  postcode?: string;
  formatted_address?: string;
} | undefined): string {
  if (!location) {
    return safeDataValue(undefined, 'ADDRESS');
  }

  // If formatted address exists, use it
  if (location.formatted_address) {
    return location.formatted_address;
  }

  // Otherwise, build from components
  const addressParts = [
    location.address,
    location.locality,
    location.region,
    location.country,
    location.postcode,
  ].filter(Boolean); // Remove undefined/null/empty values

  return addressParts.length > 0 
    ? addressParts.join(', ') 
    : safeDataValue(undefined, 'ADDRESS');
}

/**
 * Safely formats category information
 * @param categories Array of categories or undefined
 * @returns A string representation of categories with fallback handling
 */
export function safeFormatCategories(categories: { name: string }[] | undefined): string {
  if (!categories || categories.length === 0) {
    return safeDataValue(undefined, 'CATEGORY');
  }
  
  return categories.map(cat => cat.name).join(', ');
}