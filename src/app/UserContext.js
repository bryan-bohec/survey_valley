"use client";
import React, { createContext, useState, useEffect } from "react";
import supabase from "./config/supabase";
export const UserContext = createContext();
import { useRouter } from "next/navigation";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const router = useRouter();



  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user)
  }

  useEffect(() => {
    getUser()
  }, []);

  const logout = async () => {
    let { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login")
    } else {
      alert("Erreur deconnexion")
    }
  };

  const updateUser = async (userData) =>{
    const { data, error } = await supabase.auth.updateUser({
      data: { userData }
    })
    getUser();
    if (error) {
      return false; // Return false if there is an error
    } else {
      return true; // Return true if the update was successful
    }
  }

  return <UserContext.Provider value={{ user, updateUser, logout, getUser }}>{children}</UserContext.Provider>;
};
