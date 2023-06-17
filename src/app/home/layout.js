"use client";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
//import { SidebarNav } from "./components/sidebar/sidebar";
import { UserContext } from "../UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { SidebarNav } from "./components/sidebar/sidebar";

export default function MainLayout({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <main className="min-h-screen flex text-white font-roboto tracking-widest ">
      <SidebarNav />
      <div className=" w-full bg-dark-blue flex justify-center items-center p-5">
        <div className="container bg-light-blue rounded-2xl p-6" style={{ width: "100%", height: "100%" }}>
          {children}
        </div>
      </div>
    </main>
  );
}
