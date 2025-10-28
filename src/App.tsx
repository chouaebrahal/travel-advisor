import { useEffect, useState } from "react";
import Header from "./components/elements/Header";
import List from "./components/elements/List";
import Map from "./components/elements/Map";
import type { FoursquarePlace, FoursquareResponse } from "./lib/types";
type Bounds = {
  northEast: {
    latitude: number;
    longitude: number;
  };
  southWest: {
    latitude: number;
    longitude: number;
  };
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [placesResponse, setPlacesResponse] = useState<FoursquareResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [placeError, setPlaceError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>(
    "4d4b7105d754a06374d81259"
  );

  const [markerClicked, setMarkerClicked] = useState<number | null>(null);
  const [bounds, setBounds] = useState<Bounds>({
    northEast: { latitude: 12.838442, longitude: 109.149359 },
    southWest: { latitude: 11.847676, longitude: 109.095887 },
  });
  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setBounds({
        northEast: { latitude: latitude + 0.05, longitude: longitude + 0.05 },
        southWest: { latitude: latitude - 0.05, longitude: longitude - 0.05 },
      });
    },
    (error) => {
          console.error("Error getting location:", error);
          // Set a default location when geolocation fails
          setBounds({
            northEast: { latitude: 40.748817, longitude: -73.985428 }, // Default to NYC
            southWest: { latitude: 40.712776, longitude: -74.005974 },
          });
          setPlaceError("Unable to access your location. Showing default location.");
        },
         {
         enableHighAccuracy: true,
         timeout: 10000, // 10 seconds
         maximumAge: 60000, // 1 minute
       }
  );
  }, []);

  useEffect(() => {
    async function getPlace() {
      try {
        if (searchTerm.length > 3) {
          const res = await fetch(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(
              `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&limit=1`
            )}`
          );
          if (!res.ok) {
            throw new Error("Failed to load places. Please try again.");
          }
          const place = await res.json();
          if (place) {
            setBounds({
              northEast: {
                latitude: parseFloat(place[0].boundingbox[1]),
                longitude: parseFloat(place[0].boundingbox[3]),
              },
              southWest: {
                latitude: parseFloat(place[0].boundingbox[0]),
                longitude: parseFloat(place[0].boundingbox[2]),
              },
            });
          }
        }
      } catch (err) {
        setSearchError("Failed to find places. Please try again.");
        console.log("Places fetch error", err);
      }
    }
    getPlace();
  }, [searchTerm]);

  console.log(bounds);
  const places: FoursquarePlace[] | undefined = placesResponse?.results;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://travel-advisor-backend-g3xa.onrender.com/api/places?latne=${
            bounds?.northEast.latitude || 12.838442
          }&lngne=${bounds?.northEast.longitude || 109.149359}&latsw=${
            bounds?.southWest.latitude || 11.847676
          }&lngsw=${
            bounds?.southWest.longitude || 109.095887
          }&fsq_category_ids=${selectedValue}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch Places,please try again");
        }
        const data = await res.json();
        setPlacesResponse(data);
        console.log(data);
      } catch (err) {
        setPlaceError("Failed to Load Places,Please try again");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaces();
  }, [bounds, selectedValue]);

  return (
    <main>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-12 grid-rows-12 h-[calc(100vh-80px)]">
        <List
          isLoading={isLoading}
          places={places}
          markerClicked={markerClicked}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          placeError={placeError}
          searchError={searchError}
        />
        <Map
          places={places}
          bounds={bounds}
          setBounds={setBounds}
          setMarkerClick={setMarkerClicked}
        />
      </div>
    </main>
  );
}

export default App;
