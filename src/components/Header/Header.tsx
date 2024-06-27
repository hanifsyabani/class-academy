"use client";

import { useRouter } from "next/navigation";
import ButtonsNavbar from "../Navbar/ButtonsNavbar";
import { IoArrowBackCircle } from "react-icons/io5";

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <IoArrowBackCircle
          size={30}
          onClick={() => router.back()}
          className="cursor-pointer text-primary hover:text-secondary transition-all"
        />
        <h1 className="font-bold text-primary">{title}</h1>
      </div>
      <ButtonsNavbar />
    </div>
  );
}
