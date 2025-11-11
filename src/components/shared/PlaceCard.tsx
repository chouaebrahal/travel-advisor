import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { FoursquarePlace } from "@/lib/types";
import { safeDataValue, safeExtractDomain, safeFormatAddress } from "@/utils/dataUtils";

type PlaceCardPropsType = {
    place:FoursquarePlace;
    setItemRef:(elements: HTMLDivElement) => void;
    randomImage: () => string | undefined;
}

const PlaceCard = ({randomImage,place,setItemRef}:PlaceCardPropsType) => {
  return (
     <Card
        ref={setItemRef}
        
        className="p-0 mb-5 gap-0 w-full md:w-[48%] xl:w-full bg-zinc-900 text-white hover:scale-[1.02] cursor-pointer border border-secondary transition-all duration-300"
      >
        <CardHeader className="h-50 p-0 m-0 overflow-hidden rounded-t-2xl">
          <img
            src={randomImage()}
            alt={"Restaurant Image"}
            className="h-full w-full object-cover "
          />
        </CardHeader>

        <CardContent className="px-4 py-4 m-0  flex flex-col justify-between h-60">
          <CardTitle className="text-lg font-bold mb-2"> {safeDataValue(place.name, 'NAME')} </CardTitle>
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
          <p>
            <span className="font-bold">Location: </span>{" "}
            {safeFormatAddress(place.location)}
          </p>
          <div className="flex flex-col lg:flex-row items-left justify-between">
            <p className="text-blue-400">
              <span className="font-bold text-white">Tel: </span>
              {safeDataValue(place.tel, 'PHONE')}
            </p>
            <a href={place.website || "#"} className="text-blue-400" 
               onClick={(e) => !place.website && e.preventDefault()}>
              <span className="font-bold text-white">Website: </span>
              {safeExtractDomain(place.website)}
            </a>
          </div>
        </CardContent>
      </Card>
  )
}


export default PlaceCard