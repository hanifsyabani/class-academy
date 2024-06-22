"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubNav({
  title,
  link,
}: {
  title: string;
  link: string;
}) {

  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log(session?.user?.role)
  
  useEffect(() => {
    if (status === "unauthenticated" ) {
      router.push("/login");
    }
  }, [status]);

  // if(!session?.user.role) return null

  return (
    <div className="flex justify-between items-center mt-6">
      <h1 className="font-bold text-primary">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="text-secondary px-4 py-2  hover:bg-secondary hover:text-white transition-all rounded-xl">
          Export CSV
        </button>
        {session?.user?.role === "admin" ? (
          <Link href={`${link}`}>
            <button className="bg-secondary text-white px-4 py-2 border border-secondary hover:bg-white hover:text-secondary transition-all rounded-xl">
              Add {title}
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
