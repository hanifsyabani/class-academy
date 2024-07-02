"use client";

import Action from "@/components/Action/Action";
import SubNav from "@/components/Navbar/SubNav";
import NotFound from "@/components/NotFound/NotFound";
import Search from "@/components/Search/Search";
import { TableTitle } from "@/components/Students/TableTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NextPage } from "next";
import React from "react";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

interface Students {
  id: number;
  fullName: string;
  nik: string;
  class: string;
  email: string;
  gender: string;
  phone: string;
}

interface ListStudentsProps {
  data: Students[];
  isLoading: boolean;
  currentPage: number;
  pageCount: number;
  handlePageChange: ({ selected }: { selected: number }) => void;
  title?: string
  link?: string
}

const ListStudents: NextPage<ListStudentsProps> = ({
  data,
  isLoading,
  currentPage,
  pageCount,
  handlePageChange,
  title,
  link
}) => {
  return (
    <div className="py-4">
      <SubNav title={`${title}`} link={`${link}`} dataset={data} />

      <Search placeholder="Search Students" />
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <ClipLoader />
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <NotFound title="Student" />
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
                    {TableTitle.map((item) => (
                      <TableHead key={item.id} className="font-bold bg-sky-100">
                        {item.title}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data
                    .slice(currentPage * 10, (currentPage + 1) * 10)
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.nik}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Action
                            content="students"
                            id={student.id}
                            data={student}
                          />
                        </TableCell>
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

export default ListStudents;
