"use client";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { SidebarNav } from "./components/sidebar/sidebar";
import { UserContext } from "../UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";

export default function MainLayout({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <main className="min-h-screen flex text-white font-roboto tracking-widest">
      <SidebarNav />
      <div className=" w-full bg-dark-blue flex justify-center items-center">
        <div className="container bg-light-blue rounded-2xl p-6" style={{ minWidth: "95%", maxWidth: "95%", height: "95%" }}>
          {children}
        </div>{" "}
      </div>
    </main>
  );
}

const mainRoutes = [
  {
    name: "Les sondages",
    route: "/home/surveys",
  },
  {
    name: "Les résultats",
    route: "/home/results",
  },
];
const sideRoutes = [
  {
    name: "Votre profil",
    route: "/home/profile",
  },
];
