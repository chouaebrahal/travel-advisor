
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { FoursquarePlace } from "@/lib/types";
import { useEffect, useMemo, useRef } from "react";
import { SpinnerComponent } from "../shared/SpinnerComponent";
import NoData from "../shared/NoData";
import { Restaurantimages,StadiumImages,LibrariesImages } from "@/utils/images";
import PlaceCard from "../shared/PlaceCard";

const List = ({
  isLoading,
  places,
  markerClicked,
  selectedValue,
  setSelectedValue,
  searchError,
  placeError
}: {
  isLoading: boolean;
  places?: FoursquarePlace[];
  markerClicked: number | null;
  selectedValue:string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  searchError:string | null
  placeError:string | null
}) => {
  const refArray = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (markerClicked !== null && refArray.current[markerClicked]) {
      refArray.current[markerClicked].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [markerClicked]);

  const setItemRef = (index: number) => (elements: HTMLDivElement) => {
    refArray.current[index] = elements;
  };

  

  function randomImage(){
    
    if(selectedValue === '4d4b7105d754a06374d81259' ){
        return Restaurantimages[Math.floor(Math.random() * Restaurantimages.length)]
    }else if(selectedValue === '4bf58dd8d48988d189941735'){
        return StadiumImages[Math.floor(Math.random() * StadiumImages.length)]
    }else if(selectedValue === '4bf58dd8d48988d12f941735'){
        return LibrariesImages[Math.floor(Math.random() * LibrariesImages.length)]
    }

    
  }

  const placesElements = useMemo( ()=>{
    return places?.map((place, i) => {
    return (
     <PlaceCard randomImage={randomImage} setItemRef={setItemRef(i)} place={place} />
    );
    
  })
},[places,selectedValue])

  return (
    <aside className="bg-black col-start-1 col-span-12 row-start-7 row-span-6 xl:col-start-1 xl:col-span-3  xl:row-start-1 xl:row-end-13    p-4 md:p-6  lg:h-full scroll-smooth overflow-x-scroll lg:overflow-x-hidden overflow-y-scroll lg:overflow-y-scroll ">
      <div className="w-full h-fit pb-4">
        <Select
          defaultValue="4d4b7105d754a06374d81259"
          onValueChange={setSelectedValue}
          
        >
          <SelectTrigger  className="w-[180px] border border-secondary text-white">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-gray-950 text-white dark:text-black border border-secondary">
            <SelectItem value="4d4b7105d754a06374d81259" >
              Restaurants
            </SelectItem>
            <SelectItem value="4bf58dd8d48988d189941735">
              Football Stadium
            </SelectItem>
            <SelectItem value="4bf58dd8d48988d12f941735">Libraries</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className={`flex flex-wrap gap-8 scroll-smooth px-2 lg:block w-full h-full pb-4`}>
        {isLoading ? (
          <SpinnerComponent />
        ) : placesElements?.length ? (
          placesElements
        ) :  (
          <NoData searchError={searchError} placeError={placeError} />
        ) 
      }
      </div>
    </aside>
  );
};

export default List;
