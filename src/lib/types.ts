export interface FoursquareCategory {
  fsq_category_id: string;
  name: string;
  short_name: string;
  plural_name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
}

export interface FoursquareLocation {
  address?: string;
  locality?: string;
  region?: string;
  country?: string;
  formatted_address: string;
  postcode?: string;
}

export interface FoursquarePlace {
  fsq_place_id: string;
  name: string;
  location: FoursquareLocation;
  categories: FoursquareCategory[];
  latitude: number;
  longitude: number;
  tel?: string;
  website?: string;
  distance?: number;
}

export interface FoursquareResponse {
  results: FoursquarePlace[];
  context?: Record<string, any>;
}
