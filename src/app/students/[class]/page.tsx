"use client";

import Header from "@/components/Header/Header";
import SubNav from "@/components/Navbar/SubNav";
import ListStudents from "@/components/Students/ListStudents";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Students {
  id: number;
  fullName: string;
  nik: string;
  class: string;
  email: string;
  gender: string;
  phone: string;
}

export default function NumberClass() {
  const params = useParams();
  const [studentData, setStudentData] = useState<Students[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getStudents() {
      setIsLoading(true);
      const res = await fetch("/api/students/classes");
      const data = await res.json();
      if (data) {
        if (params.class === "class10") {
          setStudentData(data.class10);
        } else if (params.class === "class11") {
          setStudentData(data.class11);
        } else if (params.class === "class12") {
          setStudentData(data.class12);
        } else {
          setStudentData([]);
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          color: "red",
        });
      }

      setIsLoading(false);
    }

    getStudents();
  }, [params.class]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(studentData.length / itemsPerPage);

  return (
    <div className="px-10 py-5">
      <Header title={`List of ${params?.class} students`} />
      

      <div>
        <ListStudents 
          data={studentData}
          isLoading={isLoading}
          currentPage={currentPage}
          pageCount={pageCount}
          handlePageChange={handlePageChange}
          title={`List of ${params?.class} students`}
        />
      </div>
    </div>
  );
}
