"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import CardEvent from "@/components/Events/CardEvent";
import { useSession } from "next-auth/react";
import CardAddEvent from "@/components/Events/CardAddEvent";
import Link from "next/link";

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

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    const filtered = events.filter((event) => event.date === formattedDate);
    setFilteredEvents(filtered);
  };

  const [event, setEvent] = useState<CardAddEvents[]>([]);

  useEffect(() => {
    async function getEventsData() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvent(data);
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
            {event.map((event: any) => (
              <CardEvent data={event} />
            ))}
            {session?.user?.role === "admin" && <CardAddEvent />}
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-primary">
            Past Events
          </h1>
          <div className="grid lg:grid-cols-3 mt-10">
            {event.map((event: any) => (
              <CardEvent data={event} key={event.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <div className="mb-10">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="bg-white p-4 rounded-lg shadow"
            tileClassName={({ date, view }) => {
              const eventDates = events.map((event) => event.date);
              if (eventDates.includes(format(date, "yyyy-MM-dd"))) {
                return "highlight";
              }
              return "";
            }}
          />
        </div>
        <div>
          {filteredEvents.length === 0 ? (
            <div>
              <h1>Add event</h1>
            </div>
          ) : (
            <ul className="space-y-4">
              {filteredEvents.map((event) => (
                <li
                  key={event.id}
                  className="p-4 border rounded-lg shadow"
                  style={{ borderColor: "#509CDB" }}
                >
                  <h2
                    className="text-2xl font-semibold"
                    style={{ color: "#152259" }}
                  >
                    {event.title}
                  </h2>
                  <p className="text-gray-700">{event.description}</p>
                  <p className="text-gray-500">Date: {event.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
