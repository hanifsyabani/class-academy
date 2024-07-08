'use client'

import { IoIosAddCircle, IoMdAdd } from "react-icons/io";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "../ui/use-toast";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CardAddEvent() {
  const [imgEvent, setImgEvent] = useState<File>();
  const [title, setTitle] = useState("");
  const [categoryEvent, setCategoryEvent] = useState("");
  const [timeEvent, setTimeEvent] = useState("");

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

      const res = await fetch("/api/events", {
        body: data,
        method: "POST",
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
      <Link href={"/events/addevent"}>
        <div className="w-44 border border-primary flex justify-center items-center cursor-pointer hover:bg-secondary transition-all group rounded-xl h-32">
          <div className="flex items-center gap-2">
            <IoIosAddCircle
              size={30}
              className="text-primary group-hover:text-white"
            />
            <h1 className="text-primary group-hover:text-white font-semibold">
              Add event
            </h1>
          </div>
        </div>
      </Link>
    </>
  );
}
