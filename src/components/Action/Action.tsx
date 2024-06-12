"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RiEditBoxFill, RiEyeFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { toast } from "../ui/use-toast";

export default function Action({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  async function handleDelete(id: number) {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;
    try {
      const res = await fetch(`/api/${content}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Profile deleted successfully",
        });
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <RiEyeFill className="w-6 h-6 text-blue-500 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>View Profile</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <RiEditBoxFill className="w-6 h-6 text-green-500 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Profile</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <MdDelete
            className="w-6 h-6 text-red-500 cursor-pointer"
            onClick={() => handleDelete(id)}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
