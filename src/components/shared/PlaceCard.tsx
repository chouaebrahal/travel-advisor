import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { FoursquarePlace } from "@/lib/types";

type PlaceCardPropsType = {
    place:FoursquarePlace;
    setItemRef:(elements: HTMLDivElement) => void;
    randomImage: () => string | undefined;
}
function extractDomain(url: string) {
    try {
      const hostname = new URL(url).hostname;
      // Remove 'www.' if it exists
      return hostname.replace(/^www\./, "");
    } catch (error) {
      return null; // in case url is invalid
    }
  }

const PlaceCard = ({randomImage,place,setItemRef}:PlaceCardPropsType) => {
  return (
     <Card
        ref={setItemRef}
        
        className="p-0 mb-5 gap-0 w-full md:w-[48%] xl:w-full bg-zinc-900 text-white"
      >
        <CardHeader className="p-0 m-0 overflow-hidden rounded-t-2xl">
          <img
            src={randomImage()}
            alt={"Restaurant Image"}
            className="h-50  w-full object-cover "
          />
        </CardHeader>

        <CardContent className="px-4 py-2 m-0 h-full flex flex-col ">
          <CardTitle className="text-lg font-bold mb-2"> {place.name} </CardTitle>
          <p className="flex flex-col lg:flex-row items-center justify-between w-full text-blue-400">
            <span className="block mb-1 font-bold w-full lg:w-40 truncate overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-white">Latitude:</span>{" "}
              {place.latitude}
            </span>
            <span className="block mb-1 font-bold w-full lg:w-40 truncate overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-white">Longitude:</span>{" "}
              {place.longitude}
            </span>
          </p>
          {place.location.formatted_address && (
            <p>
              <span className="font-bold">Location: </span>{" "}
              {place.location.formatted_address}
            </p>
          )}
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {place.tel && (
              <p className="text-blue-400">
                <span className="font-bold text-white">Tel: </span>
                {place.tel}
              </p>
            )}
            {place.website && (
              <a href={place.website} className="text-blue-400">
                <span className="font-bold text-white">Website: </span>
                {extractDomain(place.website)}
              </a>
            )}
          </div>
        </CardContent>
      </Card>
  )
}

export default PlaceCard