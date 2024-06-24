"use client";

import { MainFeatures, adminFeatures } from "@/components/Main/MainFeatures";
import { RiAdminFill } from "react-icons/ri";
import { PiChalkboardTeacher, PiStudentFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { TiSupport } from "react-icons/ti";
import ButtonsNavbar from "@/components/Navbar/ButtonsNavbar";
import { useSession } from "next-auth/react";
import moment from "moment";
import Link from "next/link";
import BarChart from "@/components/Chart/BarChar";
import { FaChartBar } from "react-icons/fa";
import PieChart from "@/components/Chart/Piechart";


interface Feature {
  id: number;
  fitur: string;
  desc?: string;
  iconKey?: string;
  link?: string;
}

export default function Home() {
  const { data: session }: { data: any; status: any } = useSession();

  const date = moment().format("LL");

  const renderIcon = (id: number) => {
    switch (id) {
      case 1:
        return <RiAdminFill size={30} className="text-primary" />;
      case 2:
        return <PiChalkboardTeacher size={30} className="text-primary" />;
      case 3:
        return <PiStudentFill size={30} className="text-primary" />;
      case 4:
        return <SiGoogleclassroom size={30} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="px-5 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold">Dashboard</h1>
          <p>{date}</p>
        </div>
        <ButtonsNavbar />
      </div>

      <div className="mt-10">
        <h1 className="font-bold text-3xl text-tertiary">
          Hi {session?.user?.name}, Welcome to your dashboard, Class Academy
        </h1>
        <div>
          {session?.user?.role === "teachers" ? (
            <div className="mt-9 flex items-end gap-10">
              <div>
                {MainFeatures.map((features: Feature) => (
                  <div key={features.id}>
                    {features.id !== 1 && (
                      <div className="flex gap-4 mb-5 hover:bg-secondary p-4 rounded-lg hover:text-white ease-linear duration-300 cursor-pointer group">
                        <div className="bg-gray-200 p-2 rounded-full w-20 h-20 flex justify-center items-center ">
                          {renderIcon(features.id)}
                        </div>
                        <div>
                          <h1 className="font-semibold text-xl text-tertiary group-hover:text-white">
                            {features.fitur}
                          </h1>
                          <p className="mt-4 max-w-xl">{features.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 group bg-primary px-8 py-2 rounded-full hover:bg-white border border-primary">
                <TiSupport
                  size={25}
                  className="text-white z-10 group-hover:text-primary"
                />

                <button className="text-white group-hover:text-primary cursor-pointer">
                  Support
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center mt-10 gap-7 flex-wrap">
                {adminFeatures.map((feature: Feature) => (
                  <Link href={`${feature.link}`} key={feature.id}>
                    <div className="bg-gray-200 hover:bg-secondary cursor-pointer w-52 flex flex-col justify-center items-center gap-4 p-4 rounded-lg group">
                      <div className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
                        {renderIcon(feature.id)}
                      </div>
                      <h1 className="font-semibold group-hover:text-white">
                        {feature.fitur}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-20 ">
                <div className="flex items-center gap-4">
                  <FaChartBar size={30} className="text-primary" />
                  <h1 className="font-semibold text-primary">Statistics Class Academy</h1>
                </div>
                <div className="w-full flex justify-center gap-8 mt-10">
                  <div className="w-1/2">
                    <h2 className="font-semibold text-center text-primary mb-4">Grafik Role</h2>
                    <BarChart />
                  </div>
                  <div className="w-1/3">
                    <h2 className="font-semibold text-center text-primary mb-4">Grafik Student Gender</h2>
                    <PieChart/>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
