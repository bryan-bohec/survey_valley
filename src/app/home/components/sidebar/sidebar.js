"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from "react-pro-sidebar";
import { BarChart } from "./icons/BarChart";
import { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { Calendar } from "./icons/Calendar";
import { Badge } from "./Badge";
import { Typography } from "./Typography";
import { Logout } from "./icons/Logout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../../../app/globals.css";
const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const SidebarNav = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(true);
  const [theme, setTheme] = React.useState("dark");

  const { user, userData, logout } = useContext(UserContext);

  const pathname = usePathname();

  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1) : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={rtl}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
        style={{ border: "0" }}
        className="sidebar"
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Image src="/surveyValley.png" alt="Description of the image" width={400} height={400} className="-mt-6" />
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <div style={{ padding: "0 24px", marginBottom: "8px" }}>
              {user && <h2 className="text-white mb-4">{user.email}</h2>}
              <Typography variant="body2" fontWeight={600} style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}>
                Les sondages
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <Link href="/home/surveys">
                <MenuItem icon={<BarChart />} className={`${pathname === "/home/surveys" ? "bg-light-blue text-white" : ""}`}>
                  Sondages
                </MenuItem>
              </Link>

              <Link href="/home/statistics">
              <MenuItem icon={<BarChart />} className={`${pathname === "/home/statistics" ? "bg-light-blue text-white" : ""}`}>Résultats</MenuItem>
              </Link>
              
            </Menu>

            <div style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}>
              <Typography variant="body2" fontWeight={600} style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}>
                Paramètres
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              <Link href="/home/profile">
                <MenuItem
                  className={`${pathname === "/home/profile" ? "bg-light-blue text-white" : ""}`}
                  icon={<Calendar />}
                  suffix={
                    !userData && (
                      <Badge variant="danger" shape="circle">
                        !
                      </Badge>
                    )
                  }
                >
                  Votre profil
                </MenuItem>
              </Link>
              <MenuItem icon={<Logout />} onClick={logout}>Se déconnecter</MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>

      <div style={{ marginBottom: "16px" }}>
        {broken && (
          <button className="sb-button absolute" onClick={() => setToggled(!toggled)}>
            Toggle
          </button>
        )}
      </div>
    </div>
  );
};
