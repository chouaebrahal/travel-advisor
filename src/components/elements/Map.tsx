import type { FoursquarePlace } from "@/lib/types";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";


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
interface MapPropsType {
  places?: FoursquarePlace[];
  bounds?: Bounds;
  setBounds: React.Dispatch<React.SetStateAction<Bounds>>;
  setMarkerClick: React.Dispatch<React.SetStateAction<number | null>>;
}

function MapUpdater({ bounds }: { bounds?: Bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds([
        [bounds.northEast.latitude, bounds.northEast.longitude],
        [bounds.southWest.latitude, bounds.southWest.longitude],
      ]);
    }
  }, [bounds, map]);

  return null;
}

function MapWithBoundsLogger({
  setBounds,
}: {
  setBounds: React.Dispatch<React.SetStateAction<Bounds>>;
}) {
  useMapEvents({
    moveend(e) {
      const map = e.target;
      const bounds = map.getBounds();

      const topRight = bounds.getNorthEast();

      const bottomLeft = bounds.getSouthWest();

      console.log("Top Right:", topRight);
      console.log("Bottom Left:", bottomLeft);

      setBounds({
        northEast: { latitude: topRight.lat, longitude: topRight.lng },
        southWest: { latitude: bottomLeft.lat, longitude: bottomLeft.lng },
      });
    },
  });

  return null;
}

const Map = ({ places, bounds, setBounds, setMarkerClick }: MapPropsType) => {
  function handleMarkerClick(i:number) {
    setMarkerClick(i);
  }

  return (
    <div className="row-start-1 row-span-6 col-start-1 col-span-12 xl:col-start-4 xl:col-span-9 xl:row-start-1 xl:row-span-12 bg-blue-300 h-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {useMemo(()=>{
          return places?.map((place, i) => {
          return (
            <Marker
              eventHandlers={{
                click: () => {
                  handleMarkerClick(i)
                },
              }}
              key={i}
              position={[place.latitude, place.longitude]}
            >
              <Popup>
                <h3 className="text-xl">{place.name}</h3> <br /> <p className="text-blue-500">{place.distance} m</p>
              </Popup>
            </Marker>
          );
        })
        },[places])}

        <MapUpdater bounds={bounds} />
        <MapWithBoundsLogger setBounds={setBounds} />
      </MapContainer>
    </div>
  );
};

export default Map;
