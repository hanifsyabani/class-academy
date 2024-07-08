"use client";

import NavbarId from "@/components/Navbar/NavbarId";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiTwitterLine,
  RiYoutubeLine,
} from "react-icons/ri";

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  img: string;
  description: string;
  about: string;
  keyEvent: string;
}

export default function EventsById() {
  const [event, setEvent] = useState({} as Event);

  const params = useParams();

  useEffect(() => {
    async function getEventid() {
      const res = await fetch(`/api/events/${params.id}`);
      const data = await res.json();

      setEvent(data);
    }

    getEventid();
  }, [params.id]);

  const getText = (selectedText: any) => {
    const doc = new DOMParser().parseFromString(selectedText, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="px-[5%] py-7">
      <NavbarId title={event.title} />
      <div className="mt-7">
        <Image
          src={event.img}
          alt={event.title}
          className="w-full h-72 rounded-xl"
          width={200}
          height={200}
        />

        <h1 className="text-4xl font-bold my-5">{event.title}</h1>
        <p className="text-lg  underline">Class Academy - Jakarta, Indonesia</p>

        <p className="my-6">{event.description}</p>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-black flex justify-center items-center">
            <RiFacebookLine size={25} />
          </div>
          <div className="w-10 h-10 rounded-full border border-black flex justify-center items-center">
            <RiInstagramLine size={25} />
          </div>
          <div className="w-10 h-10 rounded-full border border-black flex justify-center items-center">
            <RiTwitterLine size={25} />
          </div>
          <div className="w-10 h-10 rounded-full border border-black flex justify-center items-center">
            <RiYoutubeLine size={25} />
          </div>
        </div>
      </div>

      <div className="flex gap-10 mt-10">
        <div className="w-[20%]">
          <h1 className="text-xl font-semibold mb-4 ">Key events</h1>
          <div className="border border-black text-center w-32 px-8 rounded-full py-2">
            <p>{event.keyEvent}</p>
          </div>
        </div>
        <div className="w-[80%]">
          <h1 className="text-xl font-semibold mb-4 ">About this events</h1>
          <p>{getText(event.about)}</p>
        </div>
      </div>
    </div>
  );
}
