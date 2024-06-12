import { IoMdNotificationsOutline } from "react-icons/io";

export default function ButtonsNavbar() {
  return (
    <div className="flex items-center gap-6">
      
      <IoMdNotificationsOutline size={25} />
      <button className="w-24 p-4 py-2 rounded-xl bg-secondary text-center text-white font-semibold hover:bg-white hover:text-secondary transition-all border border-secondary">
        Log out
      </button>
    </div>
  );
}
