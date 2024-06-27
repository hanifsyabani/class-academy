"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { CSVLink } from "react-csv";

export default function SubNav({
  title,
  link,
  dataset,
}: {
  title: string;
  link: string;
  dataset?: any;
}) {
  const { data: session }: { data: any } = useSession();

  if(!dataset) return null;

  const csvData = dataset.map((item : any) => ({
    Name: item.fullName,
    Email: item.email,
    Class: item.class,
    Gender: item.gender,
    Nik: item.nik,
    Phone: item.phone,
    Designation: item.Designation,
  }))

   
  return (
    <div className="flex justify-between items-center mt-5">
      <h1 className="font-bold text-primary">{title}</h1>
      <div className="flex items-center gap-4">
        <CSVLink data={csvData} filename={`${title}.csv`}>
          <button className="text-secondary px-4 py-2  hover:bg-secondary hover:text-white transition-all rounded-xl">
            Export CSV
          </button>
        </CSVLink>
        {session?.user?.role === "admin" ? (
          <Link href={`${link}`}>
            <button className="bg-secondary text-white px-4 py-2 border border-secondary hover:bg-white hover:text-secondary transition-all rounded-xl">
              Add {title}
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
