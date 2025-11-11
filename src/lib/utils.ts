import { clsx, type ClassValue } from "clsx"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const useDebounced  =  (value:string,delay:number) => {
       const [debounced, setDebounced] = useState(value)
       useEffect(()=>{
        
        const timeInterval = setTimeout(()=>{
          
            setDebounced(value)
        
       },delay)

       return () => clearTimeout(timeInterval)

       },[value,delay])
       return debounced
    }
