import { MainFeatures } from "@/components/Main/MainFeatures";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { PiChalkboardTeacher, PiStudentFill } from "react-icons/pi";
import { TiSupport } from "react-icons/ti";
import ButtonsNavbar from "@/components/Navbar/ButtonsNavbar";

export default function Home() {
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
        <ButtonsNavbar/>
      </div>

      <div className="mt-10">
        <h1 className="font-bold text-3xl text-tertiary">
          Hi [name], Welcome to your dashboard, Class Academy
        </h1>
        <div className="flex items-end gap-10">
          <div className="mt-9 ">
            {MainFeatures.map((features) => (
              <div key={features.id} className="flex gap-4 mb-8 hover:bg-secondary p-4 rounded-lg hover:text-white ease-linear duration-300 cursor-pointer group">
                {features.id === 1 ? (
                  <div className="bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center ">
                    <RiAdminFill size={25} className="text-primary" />
                  </div>
                ) : features.id === 2 ? (
                  <div className="bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center ">
                    <PiChalkboardTeacher size={25} className="text-primary" />
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
            ))}
          </div>
          <div className="flex items-center gap-4 group bg-primary px-8 py-2 rounded-full hover:bg-white border border-primary">
            <TiSupport
              size={25}
              className="text-white z-10 group-hover:text-primary"
            />

            <button className="text-white group-hover:text-primary">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
