"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import CardEvent from "@/components/Events/CardEvent";
import { useSession } from "next-auth/react";
import CardAddEvent from "@/components/Events/CardAddEvent";
import Link from "next/link";
import { HashLoader } from "react-spinners";

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

const events: Event[] = [
  {
    id: 1,
    title: "Math Workshop",
    description: "A workshop on advanced math topics",
    date: "2024-07-15",
  },
  {
    id: 2,
    title: "Science Fair",
    description: "Annual science fair with student projects",
    date: "2024-07-20",
  },
  {
    id: 3,
    title: "History Seminar",
    description: "Seminar on World War II",
    date: "2024-08-05",
  },
];

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const { data: session }: { data: any } = useSession();
  const [pastEvent, setPastEvent] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [event, setEvent] = useState<CardAddEvents[]>([]);

  useEffect(() => {
    setIsLoading(true);
    async function getEventsData() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvent(data.event);
      setPastEvent(data.pastEvent);
    }
    setIsLoading(false);

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
      <div className="fixed w-[20%] right-0 bg-white">
        <h1 className="text-2xl font-bold text-primary text-center">
          Our <span className="text-fourth">Partner</span>
        </h1>
      </div>
    </div>
  );
}
