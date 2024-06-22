"use client";

import ButtonsNavbar from "@/components/Navbar/ButtonsNavbar";
import { Subjects } from "@/components/Teacher/Subject";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Classes } from "../Utils/Classes";
import { IoArrowBackCircle } from "react-icons/io5";

export default function FormAdd({ content }: { content: string }) {
  const [values, setValues] = useState({
    Designation: "",
    fullName: "",
    email: "",
    gender: "",
    subject: "",
    classes: "",
    phone: "",
    nik: "",
    password: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  function handleInput(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setValues((old) => ({ ...old, [name]: value }));
  }

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/${content}`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast({
          color: "green",
          title: "Success",
          description: "Teacher added successfully",
        });

        setValues({
          Designation: "",
          fullName: "",
          email: "",
          gender: "",
          subject: "",
          nik: "",
          classes: "",
          phone: "",
          password: "",
          role: "",
        });

        router.push(`/${content}`);
      } else {
        toast({
          color: "red",
          title: "Error",
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast({
        title: `Error ${error}`,
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="px-14 py-4 ">
      <div className="flex justify-between items-center">
        <IoArrowBackCircle
          size={35}
          className="text-secondary cursor-pointer hover:scale-105 ease-linear duration-300"
          onClick={() => router.back()}
        />
        <ButtonsNavbar />
      </div>
      <form className="mt-10 px-3" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold text-tertiary">
            Add {content}
          </h1>
          <div>
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              name="Designation"
              id="Designation"
              value={values.Designation}
              onChange={handleInput}
              className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
            />
          </div>
        </div>
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
            value={values.fullName}
            onChange={handleInput}
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
                value={values.email}
                onChange={handleInput}
                className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-sm text-tertiary font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleInput}
                value={values.password}
                className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            {content === "teachers" ? (
              <div className="mb-4">
                <select
                  name="subject"
                  id="subject"
                  onChange={handleInput}
                  value={values.subject}
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
                  value={values.nik}
                  onChange={handleInput}
                  className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                className="bg-secondary text-white px-4 py-2 border border-secondary hover:bg-white hover:text-secondary transition-all rounded-xl"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <BeatLoader color="#152259" size={5} />
                ) : (
                  `Add ${content}`
                )}
              </button>
            </div>
          </div>
          <div className="w-1/2 mt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-full">
                <select
                  name="classes"
                  id="classes"
                  value={values.classes}
                  onChange={handleInput}
                  className="w-full px-2 py-3 outline-none border border-gray-300 rounded-lg"
                >
                  <option hidden>Class</option>
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
                  onChange={handleInput}
                  value={values.gender}
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
                value={values.phone}
                onChange={handleInput}
                className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            {content === "teachers" && (
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
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
