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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export default function Action({
  id,
  content,
  data,
}: {
  id: number;
  content: string;
  data: any;
}) {
  async function handleDelete(id: number) {
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
    <AlertDialog>
      <Sheet>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {content === "teachers" ? (
                <Link href={`/teachers/${id}`}>
                  <RiEyeFill className="w-6 h-6 text-blue-500 cursor-pointer" />
                </Link>
              ) : (
                <SheetTrigger>
                  <RiEyeFill className="w-6 h-6 text-blue-500 cursor-pointer" />
                </SheetTrigger>
              )}
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
              <AlertDialogTrigger>
                <MdDelete className="w-6 h-6 text-red-500 cursor-pointer" />
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

        {content === "students" && (
          <SheetContent className="w-full ">
            <SheetHeader>
              <SheetTitle>{data.fullName}</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        )}
      </Sheet>
    </AlertDialog>
  );
}
