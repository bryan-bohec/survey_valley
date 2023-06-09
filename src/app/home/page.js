"use client";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function Home() {
  return (
    <main className="min-h-screen text-white font-roboto tracking-widest">
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
      ;
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
