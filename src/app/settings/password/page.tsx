"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Password() {
  const { data: session }: { data: any } = useSession();
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function getProfile() {
      try {
        if (session?.user?.role === "teachers") {
          const profile = await fetch(`/api/teachers/${session?.user?.id}`);
          const data = await profile.json();

          setPassword(data?.password);
        }else{
          const profile = await fetch(`/api/students/${session?.user?.id}`)
          const data = await profile.json()

          setPassword(data?.password)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getProfile()
  },[session?.user?.id,session?.user?.role]);

  return (
    <div>
      <form>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="text-sm text-tertiary font-semibold"
          >
            Password
          </label>
          <input
            name="password"
            id="password"
            // onChange={handleInput}
            value={password}
            className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newpassword"
            className="text-sm text-tertiary font-semibold"
          >
            New Password
          </label>
          <input
            type="password"
            name="mewpassword"
            id="newpassword"
            // onChange={handleInput}
            // value={values?.password}
            className="w-full px-2 py-3 border border-gray-300 rounded-lg outline-none"
          />
        </div>
        <div className="bg-primary px-4 py-2 rounded-xl hover:bg-secondary transition-all w-46 text-center text-white font-semibold text-sm">
          <button>Change Password</button>
        </div>
      </form>
    </div>
  );
}
