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
import { RiEditBoxFill, RiEyeFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

interface Teacher {
  id: number;
  fullName: string;
  subject: string;
  class: string;
  email: string;
  gender: string;
  phone: string;
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
      <div className="flex justify-end">
        <ButtonsNavbar />
      </div>

      <div>
        <SubNav title="Teachers" link="/teachers/formAddTeacher" />
        <Search placeholder="Search for a teacher by name or email" />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <ClipLoader />
          </div>
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
                <TableHead className="font-bold bg-sky-100">Name</TableHead>
                <TableHead className="font-bold bg-sky-100">Subject</TableHead>
                <TableHead className="font-bold bg-sky-100">Class</TableHead>
                <TableHead className="font-bold bg-sky-100">
                  Email Address
                </TableHead>
                <TableHead className="font-bold bg-sky-100">Gender</TableHead>
                <TableHead className="font-bold bg-sky-100">Phone</TableHead>
                <TableHead className="font-bold bg-sky-100">Action</TableHead>
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
                    <TableCell>{teacher.fullName}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.class}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.gender}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <RiEyeFill className="w-6 h-6 text-blue-500" />
                      <RiEditBoxFill className="w-6 h-6 text-green-500" />
                      <MdDelete className="w-6 h-6 text-red-500" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Teachers;