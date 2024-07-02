"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import CardEditEvent from "./CardEditEvent";
import Link from "next/link";

export default function CardEvent({ data }: any) {
  const { data: session }: { data: any } = useSession();

  return (
    <div className="w-44 cursor-pointer">
      <Link href={`/events/${data.id}`}>
        <Image
          src={data.img}
          alt="eventimage"
          width={350}
          height={350}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <div className="text-center mt-5">
          <p className="text-sm">{data.date}</p>
          <h1 className="font-bold py-3">{data.category}</h1>
          <h3 className="pb-3 underline text-tertiary ">{data.title}</h3>
          <p className="text-sm">Class Academy- Jakarta, Indonesia </p>
        </div>
      </Link>
      {session?.user?.role === "admin" && <CardEditEvent id={data.id} />}
    </div>
  );
}
