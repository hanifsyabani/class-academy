'use client'

import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

interface LayoutProps{
  children: React.ReactNode
}

export default function AppLayout({children} :LayoutProps){
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Panggil signOut dari next-auth untuk menghapus sesi
      signOut({ redirect: false });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  return(
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}