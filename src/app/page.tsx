"use client";

import { MainFeatures } from "@/components/Main/MainFeatures";
import { RiAdminFill } from "react-icons/ri";
import { PiChalkboardTeacher, PiStudentFill } from "react-icons/pi";
import { TiSupport } from "react-icons/ti";
import ButtonsNavbar from "@/components/Navbar/ButtonsNavbar";
import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session}: { data: any; status: any } = useSession();


  return (
    <div className="px-14 py-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">Learn how to launch faster</p>
          <small>
            watch out webinar for tips from our experts and get a limited time
            offer
          </small>
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
                {MainFeatures.map((features) => (
                  <div key={features.id}>
                    {features.id === 1 ? null : (
                      <div className="flex gap-4 mb-5 hover:bg-secondary p-4 rounded-lg hover:text-white ease-linear duration-300 cursor-pointer group">
                        {features.id === 1 ? (
                          <div className="bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center ">
                            <RiAdminFill size={25} className="text-primary" />
                          </div>
                        ) : features.id === 2 ? (
                          <div className="bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center ">
                            <PiChalkboardTeacher
                              size={25}
                              className="text-primary"
                            />
                          </div>
                        ) : features.id === 3 ? (
                          <div className="bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center ">
                            <PiStudentFill size={25} className="text-primary" />
                          </div>
                        ) : null}
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
            <div className="flex justify-center items-center mt-10 gap-10">
              {MainFeatures.map((features) => (
                <div className="bg-gray-200 hover:bg-secondary cursor-pointer w-56 flex flex-col justify-center items-center gap-4 p-4 rounded-lg group  ">
                  {features.id === 1 ? (
                    <div className="bg-gray-300 p-2 rounded-full  flex items-center ">
                      <RiAdminFill size={45} className="text-primary" />
                    </div>
                  ) : features.id === 2 ? (
                    <div className="bg-gray-300 p-2 rounded-full flex items-center ">
                      <PiChalkboardTeacher size={45} className="text-primary" />
                    </div>
                  ) : features.id === 3 ? (
                    <div className="bg-gray-300 p-2 rounded-full  flex items-center ">
                      <PiStudentFill size={45} className="text-primary" />
                    </div>
                  ) : null}
                  <h1 className="font-semibold group-hover:text-white">
                    {features.fitur}
                  </h1>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
