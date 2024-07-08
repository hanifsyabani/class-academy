"use client";

import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CardAddEvent() {
  const [imgEvent, setImgEvent] = useState<File>();
  const [title, setTitle] = useState("");
  const [categoryEvent, setCategoryEvent] = useState("");
  const [timeEvent, setTimeEvent] = useState("");
  const [about, setAbout]= useState("");
  const [description, setDescription]= useState("");
  const [key1, setKey1]= useState("");
  const [key2, setKey2]= useState("");


  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAddEvent(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("image", imgEvent!);
      data.append("title", title);
      data.append("categoryEvent", categoryEvent);
      data.append("timeEvent", timeEvent);
      data.append("about", about);
      data.append("description", description);
      data.append("key1", key1);
      data.append("key2", key2);


      const res = await fetch("/api/events", {
        body: data,
        method: "POST",
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Event added successfully",
        });

        router.push('/events');
      } else {
        toast({
          title: "Error",
          description: "Failed add event",
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
    <>
      <div className=" w-full mx-auto px-5">
        <form onSubmit={handleAddEvent}>
          <div className="mb-8">
            {imgEvent ? (
              <div className="mt-7 flex justify-center">
                <Image
                  src={URL.createObjectURL(imgEvent)}
                  alt="image"
                  width={300}
                  height={300}
                  className="w-44 h-44  rounded-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="container w-44 h-44 rounded-full bg-gray-200 relative cursor-pointer">
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
                  onChange={(e) => setImgEvent(e.target.files?.[0])}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center items-center gap-10">
            <div className="w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block font-semibold text-primary text-sm mb-2"
                >
                  Category Events
                </label>
                <select
                  name="category"
                  id="category"
                  className="w-full outline-none px-2 py-3 border border-primary rounded-xl"
                  onChange={(e) => setCategoryEvent(e.target.value)}
                >
                  <option hidden>Category Event</option>
                  <option value="speaker">Speaker Session</option>
                  <option value="workshop">Workshop/Study Group</option>
                  <option value="info">Info Session</option>
                  <option value="PPDB">PPDB</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-semibold text-primary text-sm mb-2"
                >
                  Name Events
                </label>
                <input
                  type="text"
                  placeholder="Name Event"
                  name="name"
                  id="name"
                  onChange={(e) => setTitle(e.target.value)}
                  className=" w-full outline-none px-2 py-3 border border-primary rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block font-semibold text-primary text-sm mb-2 "
                >
                  Time Events
                </label>
                <input
                  type="date"
                  name="time"
                  id="time"
                  onChange={(e) => setTimeEvent(e.target.value)}
                  className=" w-full outline-none px-2 py-3 border border-primary rounded-md"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-semibold text-primary text-sm mb-2"
                >
                  Description Event
                </label>
                <textarea
                  placeholder="Decription Event"
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className=" w-full outline-none px-2 py-3 h-20 border border-primary rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="key1"
                  className="block font-semibold text-primary text-sm mb-2"
                >
                  Key Event 1
                </label>
                <input
                  type="text"
                  placeholder="Key Event"
                  name="key1"
                  id="key1"
                  onChange={(e) => setKey1(e.target.value)}
                  className=" w-full outline-none px-2 py-3 border border-primary rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="key2"
                  className="block font-semibold text-primary text-sm mb-2"
                >
                  Key Event 2
                </label>
                <input
                  type="text"
                  placeholder="Key Event"
                  name="key2"
                  id="key2"
                  onChange={(e) => setKey2(e.target.value)}
                  className=" w-full outline-none px-2 py-3 border border-primary rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="about"
              className="block font-semibold text-primary text-sm mb-2"
            >
              About Events
            </label>
            <ReactQuill
              theme="snow"
              className="h-80"
              value={about}
              onChange={(e) => setAbout(e)}
            />
          </div>

          <button
            type="submit"
            className="mt-20 bg-primary px-2 rounded-xl text-white py-3 w-full"
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
