"use client";

import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import CardEvent from "@/components/Events/CardEvent";
import { useSession } from "next-auth/react";
import CardAddEvent from "@/components/Events/CardAddEvent";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import sponsor1 from "@/assets/MASTER.png";
import sponsor2 from "@/assets/KemendibudLogo.png";
import sponsor3 from "@/assets/BeasiswaJakarta.png";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface CardAddEvents {
  id: number;
  title: string;
  category: string;
  img: string;
  date: string;
  status: string;
}

export default function Events() {
  const { data: session }: { data: any } = useSession();
  const [pastEvent, setPastEvent] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [event, setEvent] = useState<CardAddEvents[]>([]);

  useEffect(() => {
    async function getEventsData() {
      setIsLoading(true);
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvent(data.event);
      setPastEvent(data.pastEvent);
      setIsLoading(false);
    }

    getEventsData();
  }, []);

  return (
    <div className=" mx-auto px-4 py-8 bg-[#F8F9FA] flex ">
      <div className="w-[70%]">
        <div>
          <h1 className="text-4xl font-bold mb-6 text-center text-primary">
            Upcoming Events
          </h1>
          <div className="grid lg:grid-cols-3 mt-10 gap-10">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <HashLoader size={50} color="#509CDB" />
              </div>
            ) : (
              <>
                {event.map((event: any) => (
                  <CardEvent data={event} />
                ))}
                {session?.user?.role === "admin" && <CardAddEvent />}
              </>
            )}
          </div>
        </div>
        <div className="mt-20">
          <h1 className="text-4xl font-bold mb-6 text-center text-primary">
            Past Events
          </h1>
          <div className="grid lg:grid-cols-3 mt-10">
            {pastEvent.map((event: any) => (
              <CardEvent data={event} key={event.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="fixed w-[20%] right-0 bg-[#F8F9FA]">
        <h1 className="text-2xl font-bold text-primary text-center">
          Our <span className="text-fourth">Partner</span>
        </h1>

        <div className="flex items-center flex-wrap justify-center gap-4 mt-6">
          <div className="w-20">
            <Image
              src={sponsor1}
              alt="sponsor"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
          <div className="w-20 ">
            <Image
              src={sponsor2}
              alt="sponsor"
              width={100}
              height={100}
              className="w-full  "
            />
          </div>
          <div className="w-20 ">
            <Image
              src={sponsor3}
              alt="sponsor"
              width={100}
              height={100}
              className="w-full  "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
