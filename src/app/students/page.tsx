"use client";

import BarChart from "@/components/Chart/BarChar";
import ButtonsNavbar from "@/components/Navbar/ButtonsNavbar";
import { ClassList } from "@/components/Utils/Classes";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { FaDatabase } from "react-icons/fa";
import { useSession } from "next-auth/react";
import ListStudents from "@/components/Students/ListStudents";
import Search from "@/components/Search/Search";
import SubNav from "@/components/Navbar/SubNav";
import { CSVLink } from "react-csv";
import Header from "@/components/Header/Header";

interface Students {
  class10: any;
  class11: any;
  class12: any;
}

interface StudentData {
  id: number;
  fullName: string;
  email: string;
  class: string;
  gender: string;
  nik: string;
  phone: string;
  Designation: string | null;
}
export default function Students() {
  const [dataClass, setDataClass] = useState({} as Students);
  const [dataStudent, setDataStudent] = useState<StudentData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  const { data: session }: { data: any } = useSession();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/students/classes");
        const data = await res.json();
        setDataClass(data);

        const studentsRes = await fetch(`/api/students/byClass/${session?.user?.id}`);
        const student = await studentsRes.json();
        if (Array.isArray(student)) {
          setDataStudent(student);
        } else {
          setDataStudent([]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed Load Data",
        });
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [session?.user?.id]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(dataStudent.length / itemsPerPage);

  const class10 = dataClass.class10 ? dataClass.class10.length : null;
  const class11 = dataClass.class11 ? dataClass.class11.length : null;
  const class12 = dataClass.class12 ? dataClass.class12.length : null;

  return (
    <div className=" py-5">
      {session?.user?.role === "admin" ? (
        <>
          <div className="flex justify-between items-center px-5">
            <div className="flex items-center gap-2">
              <PiStudentFill size={20} className="text-primary" />
              <h1 className="font-bold text-primary">Select Classes</h1>
            </div>
            <ButtonsNavbar />
          </div>

          <div className="mt-10 flex justify-evenly items-center">
            {ClassList.map((item) => (
              <Link href={`${item.link}`}>
                <div className="w-44 h-32 px-3 py-4 rounded-xl bg-primary shadow-2xl flex justify-center items-center hover:bg-fourth transition-all cursor-pointer">
                  <h1 className="text-white font-bold text-5xl">
                    {item.jenjang}
                  </h1>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 px-10">
            <div className="flex items-center gap-2">
              <FaDatabase size={20} className="text-primary" />
              <h1 className="font-bold text-primary">Data By Class</h1>
            </div>
            <div className="w-[80%] mx-auto">
              <BarChart
                data1={class10}
                data2={class11}
                data3={class12}
                title1="10"
                title2="11"
                title3="12"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="px-5">
          <Header title="Students" />
          <ListStudents
            data={dataStudent}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageCount={pageCount}
            isLoading={isLoading}
            title="All Students"
          />
        </div>
      )}
    </div>
  );
}
