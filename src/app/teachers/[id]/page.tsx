"use client";

import NavbarId from "@/components/Navbar/NavbarId";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import { ClipLoader, ClockLoader } from "react-spinners";
import { IoChevronBackCircle } from "react-icons/io5";

interface Teacher {
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
}
export default function TeacherId() {
  const [teacherData, setTeacherData] = useState({} as Teacher);
  const params = useParams();
  const [image, setImage] = useState<File>();
  const router = useRouter();
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTeacherById() {
      setLoading(true);
      try {
        const data = await fetch(`/api/teachers/${params.id}`);
        const res = await data.json();

        setTeacherData(res);
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    }

    getTeacherById();
  }, []);

  async function handleUpdate() {
    setLoading(true);
    try {
      const data = new FormData();
      if (image) {
        data.append("image", image);
      }

      if (about) {
        data.append("about", about);
      }

      const res = await fetch(`/api/teachers/${params.id}`, {
        method: "PATCH",
        body: data,
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Teacher updated successfully",
        });

        router.refresh();
      } else {
        toast({
          title: "Error",
          description: "Failed upload image",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-10 py-4 ">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClockLoader size={100} color="#3b82f6" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <IoChevronBackCircle
                size={24}
                className="text-primary cursor-pointer"
                onClick={() => router.back()}
              />
              <h1 className="text-xl font-bold text-tertiary">
                Profile
              </h1>
            </div>
            <NavbarId />
          </div>

          <div className="mt-20 flex justify-center gap-20">
            <div>
              {teacherData.image ? (
                <div className=" rounded-full w-64 h-64">
                  <Image
                    src={teacherData.image}
                    alt="image"
                    width={300}
                    height={300}
                    className="w-full h-full rounded-full"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div>
                  {image ? (
                    <div className="mt-7">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="image"
                        width={300}
                        height={300}
                        className="w-full h-full rounded-full"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="container w-64 h-64 rounded-full bg-gray-200 relative cursor-pointer">
                      <div className="text hidden">
                        <div className="flex items-center gap-2">
                          <IoMdAdd size={30} className="text-primary" />
                          <h1 className="text-primary text-lg">Add image</h1>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        className="file-input hidden"
                        onChange={(e) => setImage(e.target.files?.[0])}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="mt-3 text-center">
                <h1 className="font-bold">{teacherData.fullName}</h1>
                <p>{teacherData.subject} teacher</p>
              </div>
              <div className="flex justify-center items-center gap-5 mt-6">
                <div className="bg-gray-200 p-2 rounded-2xl w-14 h-14 flex items-center justify-center hover:bg-primary group ease-in-out duration-300 cursor-pointer">
                  <LuPhoneCall
                    size={25}
                    className="text-gray-600 group-hover:text-white"
                  />
                </div>
                <div className="bg-gray-200 p-2 rounded-2xl w-14 h-14 flex items-center justify-center hover:bg-primary group ease-in-out duration-300 cursor-pointer">
                  <MdOutlineMail
                    size={25}
                    className="text-gray-600 group-hover:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <h1 className="text-lg font-bold">About</h1>
              {teacherData.about ? (
                <p className="max-w-lg mt-2 text-tertiary">
                  {teacherData.about}
                </p>
              ) : (
                <div>
                  <textarea
                    className="w-full h-32 mt-2 border border-gray-300 p-2 rounded-lg"
                    placeholder="Add about"
                    name="about"
                    id="about"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              )}

              <div className="mt-6">
                <h1 className="text-lg font-bold">Gender</h1>
                <p>{teacherData.gender}</p>
              </div>
            </div>
          </div>

          {(image || about) && (
            <div className="flex justify-end ">
              <div className="flex justify-center items-center gap-3 bg-green-500 w-24 px-4 py-2 rounded-2xl cursor-pointer text-white hover:scale-105 ease-in-out duration-300 font-bold">
                {loading ? (
                  <ClipLoader size={20} />
                ) : (
                  <>
                    <FiSave size={20} />
                    <button type="submit" onClick={handleUpdate}>
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
