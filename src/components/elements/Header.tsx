import { useState } from "react";
import { Input } from "../ui/input"

interface HeaderPropsType {
  searchTerm: string;
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({searchTerm,setSearchTerm}:HeaderPropsType) => {

  const [error,setError] = useState<string | null>()

  function validateData(data:string){
      if(data.length > 0 && data.length <= 3){
        setError("Search term must be at least 3 characters")
      }else{
        setError(null)
      }
  }
  function handleSearch (e :React.ChangeEvent<HTMLInputElement>){
     setSearchTerm(e.currentTarget.value)
     validateData(e.currentTarget.value)
  }

  return (
    <header className="bg-black">
        <div className='container mx-auto p-4 sm:p-6 flex justify-between items-center h-20'>
          <div className='inline-flex items-center'>
              <span className="text-secondary font-bold">Travel Advison</span>
          </div>

          <div>
            <Input type="text" placeholder="search" className={`max-w-50 bg-white focus:outline-1 focus:outline-pink-400 mb-1 ${error && "border border-red-600"} transition-all duration-300 `} value={searchTerm} onChange={handleSearch }/>
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
        </div>
    </header>
  )
}

export default Header