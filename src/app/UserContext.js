"use client";
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { collection, getDoc, setDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../app/config/firebase";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        console.log(user);
        const userDataRef = doc(db, "profile", user.uid);
        const userDataSnapshot = await getDoc(userDataRef);

        if (userDataSnapshot.exists()) {
          setUserData(userDataSnapshot.data());
        } else {
          setUserData(null);
        }
      } else {
        setUser(null);
      }
    });


  }, []);

  return <UserContext.Provider value={{ user, setUser, userData, setUserData }}>{children}</UserContext.Provider>;
};
