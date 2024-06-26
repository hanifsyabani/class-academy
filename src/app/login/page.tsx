"use client";

import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";

export default function Login({searchParams}: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const callbackUrl = searchParams.callbackUrl || "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });
      if (res?.ok) {
        router.push(callbackUrl);
      } else {
       
        toast({
          title: "please check your credentials",
          description: res?.error,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-10 space-y-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? <ClipLoader size={20} color="white" /> : "Sign in"}
            </button>
          </div>
          <hr className="border-1 border-tertiary" />
        </form>
        <button
          className="flex items-center justify-center gap-3 bg-gray-200 w-1/2 p-2  rounded-lg mx-auto cursor-pointer hover:bg-gray-300 transition-all"
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          <FcGoogle size={30} />
          <p className="text-center">Sign in with Google</p>
        </button>
      </div>
    </div>
  );
}
