"use client";

import { IoMdAdd } from "react-icons/io";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";

interface Events {
  id: number;
  title: string;
  category: string;
  img: string;
  time: string;
}

export default function CardEditEvent({ id }: { id: number }) {
  const [imgEvent, setImgEvent] = useState<File>();
  const [title, setTitle] = useState("");
  const [categoryEvent, setCategoryEvent] = useState("");
  const [timeEvent, setTimeEvent] = useState("");

  const [eventData, setEventData] = useState({} as Events);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getEventData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEventData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    }

    getEventData();
  }, []);

  async function handleAddEvent(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("image", imgEvent!);
      data.append("title", title);
      data.append("categoryEvent", categoryEvent);
      data.append("timeEvent", timeEvent);

      const res = await fetch(`/api/events/${id}`, {
        body: data,
        method: "PUT",
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Event added successfully",
        });

        router.refresh();
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
      <Drawer>
        <DrawerTrigger>
          <button className="flex items-center gap-2 justify-center bg-primary px-3 py-2 rounded-xl mt-3 hover:bg-secondary transition-all mx-auto w-52">
            <FaRegEdit size={20} className="text-white" />

            <p className="text-white text-sm">Edit Event</p>
          </button>
        </DrawerTrigger>

        <DrawerContent className="h-full w-1/2 mx-auto px-5">
          <form onSubmit={handleAddEvent}>
            <div className="mb-8">
              {eventData.img ? (
                <div className="mt-7 flex justify-center">
                  <Image
                    src={eventData.img}
                    alt="image"
                    width={300}
                    height={300}
                    className="w-44 h-44  rounded-full"
                    loading="lazy"
                  />
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

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
                value={eventData.category}
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
                value={eventData.title}
                onChange={(e) => setTitle(e.target.value)}
                className=" w-full outline-none px-2 py-3 border border-primary rounded-md"
              />
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="w-1/2">
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
                  value={eventData.time}
                  onChange={(e) => setTimeEvent(e.target.value)}
                  className=" w-full outline-none px-2 py-3 border border-primary rounded-md"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="status"
                  className="block font-semibold text-primary text-sm mb-2"
                >
                  Status Event
                </label>
                <select
                  name="status"
                  id="category"
                  // value={eventData.category}
                  className="w-full outline-none px-2 py-3 border border-primary rounded-xl"
                  onChange={(e) => setCategoryEvent(e.target.value)}
                >
                  <option hidden>Status</option>
                  <option value="speaker">On Going</option>
                  <option value="workshop">Done</option>
                  <option value="info">Cancelled</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 bg-primary px-2 rounded-xl text-white py-3 w-full"
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Update"}
            </button>
          </form>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
