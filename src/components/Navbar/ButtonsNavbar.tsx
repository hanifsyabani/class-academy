'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function ButtonsNavbar() {
  const router = useRouter()

  async function logout(){
    await signOut();
    router.push('/')
  }
  return (
    <div className="flex items-center gap-6">
      
      <IoMdNotificationsOutline size={25} />
      <button className="w-24 p-4 py-2 rounded-xl bg-secondary text-center text-white font-semibold hover:bg-white hover:text-secondary transition-all border border-secondary" onClick={logout}
      >
        Log out
      </button>
    </div>
  );
}
