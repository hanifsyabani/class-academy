"use client";

import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import ButtonsNavbar from "@/components/Navbar/ButtonsNavbar";
import SubNav from "@/components/Navbar/SubNav";
import Search from "@/components/Search/Search";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";
import Action from "@/components/Action/Action";
import { TableTitleTeacher } from "@/components/Teacher/TableTitleTeacher";
import NotFound from "@/components/NotFound/NotFound";
import Image from "next/image";
import Header from "@/components/Header/Header";

interface Teacher {
  id: number;
  fullName: string;
  subject: string;
  class: string;
  email: string;
  gender: string;
  phone: string;
  image: string;
  role: string;
}

const Teachers: NextPage = () => {
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    async function getTeachers() {
      setIsLoading(true);
      const res = await fetch("/api/teachers");
      const data = await res.json();
      if (data) {
        setTeacherData(data);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          color: "red",
        });
      }

      setIsLoading(false);
    }

    getTeachers();
  }, [currentPage]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(teacherData.length / itemsPerPage);

  return (
    <div className="px-6 py-4">
     
      <Header title="List of Teachers" />

      <div>
        <SubNav title="All Teachers" link="/teachers/formAddTeacher" dataset={teacherData} />
        <Search placeholder="Search for a teacher by name or email" />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <ClipLoader />
          </div>
        ) : (
          <>
            {teacherData.length === 0 ? (
              <NotFound title="Teacher" />
            ) : (
              <Table className="mt-10">
                <TableCaption>
                  <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    className="flex justify-center items-center gap-4"
                  />
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    {TableTitleTeacher.map((teacher) => (
                      <TableHead
                        className="font-bold bg-sky-100"
                        key={teacher.id}
                      >
                        {teacher.title}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherData
                    .slice(
                      currentPage * itemsPerPage,
                      (currentPage + 1) * itemsPerPage
                    )
                    .map((teacher) => (
                      <TableRow key={teacher.id}>
                        {teacher.role === "teachers" && (
                          <>
                            <TableCell className="flex items-center gap-1">
                              {teacher.image && (
                                <div className="w-8 h-8 rounded-full">
                                  <Image
                                    src={teacher.image}
                                    width={50}
                                    height={50}
                                    alt="poto"
                                    className="w-full h-full rounded-full"
                                    loading="lazy"
                                  />
                                </div>
                              )}
                              {teacher.fullName}
                            </TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>{teacher.class}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.gender}</TableCell>
                            <TableCell>{teacher.phone}</TableCell>
                            <TableCell className="flex items-center gap-2">
                              <Action
                                content="teachers"
                                id={teacher.id}
                                data={teacher}
                              />
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Teachers;
