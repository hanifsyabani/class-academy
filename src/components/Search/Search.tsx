import { FaSearch } from "react-icons/fa";

export default function Search({placeholder} :{placeholder: string}) {
  return(
    <div className="mt-6 relative">
      <FaSearch size={20} className="text-tertiary absolute top-3 left-2"/>
      <input type="search" placeholder={placeholder} className="pl-10 py-3 w-1/2 bg-gray-200 outline-none rounded-lg focus:border focus:border-primary transition-all " />
    </div>
  )
}