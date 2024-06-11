import Image from "next/image";
import logo from "@/assets/logo.svg";
import { SidebarItem } from "./SidebarItem";
import { RxDashboard } from "react-icons/rx";
import { FaChalkboardTeacher, FaRegCalendarAlt } from "react-icons/fa";
import { PiStudentBold, PiExam } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-[20%] bg-primary h-screen fixed">
      <div className="p-4 ">
        <div className="w-14 h-14 rounded-full bg-white p-2 m-auto flex items-center">
          <Image src={logo} alt="logo" />
        </div>
        <h1 className="text-center text-white py-4 font-bold">Class Academy</h1>
      </div>
      <hr className="border-gray-300 border" />

      <div className="py-4 px-7">
        {SidebarItem.map((item) => (
          <Link href={item.link} key={item.id}>
            <div className="flex items-center  gap-5 mb-4 text-white hover:bg-secondary p-2 rounded-lg cursor-pointer">
              {item.id === 1 ? (
                <RxDashboard className="text-xl" />
              ) : item.id === 2 ? (
                <FaChalkboardTeacher className="text-xl" />
              ) : item.id === 3 ? (
                <PiStudentBold className="text-xl" />
              ) : item.id === 4 ? (
                <FaRegCalendarAlt className="text-xl" />
              ) : item.id === 5 ? (
                <PiExam className="text-xl" />
              ) : item.id === 6 ? (
                <IoSettingsOutline className="text-xl" />
              ) : null}
              <h3>{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
