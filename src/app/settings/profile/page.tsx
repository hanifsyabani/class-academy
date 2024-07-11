'use client'

import { Subjects } from "@/components/Teacher/Subject";
import { Classes } from "@/components/Utils/Classes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Data{
  id: number;
  fullName: string;
  subject: string;
  class: string;
  email: string;
  gender: string;
  image: string;
  age: string;
  about: string;
  phone: string;
  nik: string;
}

export default function Profile() {
  const {data: session} : {data: any} = useSession()
  const [data, setData]= useState({} as Data )

 
  useEffect(() => {
    async function getProfile() {
      try {
        if (session?.user?.role === "teachers") {
          const profile = await fetch(`/api/teachers/${session?.user?.id}`);
          const data = await profile.json();

          setData(data);
        }else{
          const profile = await fetch(`/api/students/${session?.user?.id}`)
          const data = await profile.json()

          setData(data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getProfile()
  },[session?.user?.id,session?.user?.role]);

  return (
    <div>
      <form className="mt-10 px-3" >
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="text-sm text-tertiary font-semibold"
          >
            Fullname
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={data?.fullName}
            // onChange={handleInput}
            className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
          />
        </div>
        <div className="flex  gap-10">
          <div className="w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-sm text-tertiary font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={data?.email}
                // onChange={handleInput}
                className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
     
            {session?.user?.role === "teachers" ? (
              <div className="mb-4">
                <select
                  name="subject"
                  id="subject"
                  // onChange={handleInput}
                  value={data?.subject}
                  className="w-full px-2 py-3 outline-none border border-gray-300 rounded-lg"
                >
                  <option hidden>Subject</option>
                  {Subjects.map((subject) => (
                    <option value={subject.name} key={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="nik"
                  className="text-sm text-tertiary font-semibold"
                >
                  NIK
                </label>
                <input
                  type="text"
                  name="nik"
                  id="nik"
                  value={data?.nik}
                  // onChange={handleInput}
                  className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
                />
              </div>
            )}

            {/* {hasChange && (
              <button
                className="flex justify-center gap-2 bg-secondary text-white px-4 py-2 border border-secondary hover:bg-white hover:text-secondary transition-all rounded-xl w-32 cursor-pointer"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader size={20} color="#509CDB" />
                ) : (
                  <>
                    <FaRegSave size={20} />
                    <p>Save</p>
                  </>
                )}
              </button>
            )} */}
          </div>
          <div className="w-1/2 mt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-full">
                <select
                  name="classes"
                  id="classes"
                  value={data?.class}
                  // onChange={handleInput}
                  className="w-full px-2 py-3 outline-none border border-gray-300 rounded-lg"
                >
                  {session?.user?.role === "students" ? (
                    <option hidden>Class</option>
                  ) : (
                    <option hidden>Class Teacher</option>
                  )}
                  {Classes.map((classs) => (
                    <option value={classs.class} key={classs.id}>
                      {classs.class}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <select
                  name="gender"
                  id="gender"
                  // onChange={handleInput}
                  value={data?.gender}
                  className="w-full px-2 py-3 outline-none border border-gray-300 rounded-lg"
                >
                  <option hidden>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="text-sm text-tertiary font-semibold"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={data?.phone}
                // onChange={handleInput}
                className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            {/* {content === "teachers" && (
              <div className="mb-4">
                <select
                  name="role"
                  id="role"
                  onChange={handleInput}
                  value={values.role}
                  className="w-full px-2 py-3 outline-none border border-gray-300 rounded-lg"
                >
                  <option hidden>Role</option>
                  <option value="admin">Admin</option>
                  <option value="teachers">Teacher</option>
                  <option value="students">Student</option>
                </select>
              </div>
            )} */}
          </div>
        </div>
      </form>
    </div>
  );
}
