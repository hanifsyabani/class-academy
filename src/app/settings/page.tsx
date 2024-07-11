"use client";

import ButtonsNavbar from "@/components/Navbar/ButtonsNavbar";
import Profile from "./profile/page";
import Password from "./password/page";
import { useState } from "react";

export default function Setting() {
  const [selectedSetting, setSelectedSetting] = useState("Profile");
  const settingItem = [
    {
      name: "Profile",
    },
    {
      name: "Password",
    },
  ];

  const renderContent = () => {
    if (selectedSetting === "Profile") {
      return <Profile />;
    } else if (selectedSetting === "Password") {
      return <Password />;
    } else {
      return null;
    }
  };

  return (
    <div className="px-[3%]">
      <div className="flex justify-between py-4 ">
        <h1 className="text-primary font-bold text-xl">Settings</h1>
        <div>
          <ButtonsNavbar />
        </div>
      </div>
      <div className="flex items-center gap-10  mb-4">
        {settingItem.map((item, i) => (
          <h3
            className={`hover:text-primary  cursor-pointer hover:border-b-2  hover:border-secondary  border-b-2 ${
              selectedSetting === item.name
                ? "text-primary border-secondary"
                : "text-black border-white"
            }`}
            key={i}
            onClick={() => setSelectedSetting(item.name)}
          >
            {item.name}
          </h3>
        ))}
      </div>

      <div className="mt-10">{renderContent()}</div>
    </div>
  );
}
