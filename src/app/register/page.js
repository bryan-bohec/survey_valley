"use client";
import "@fontsource/roboto";
import Link from "next/link";
import supabase from "../config/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {  useContext } from "react";
import { UserContext } from "../UserContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {getUser} = useContext(UserContext)

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const signUp = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (!error) {
      getUser();
      router.push("/home/surveys");
    } else {
      alert(error);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center text-white font-roboto tracking-widest main-background">
      <div className="container flex bg-dark-blue px-14 py-9">
        <div className="flex flex-col bg-dark-blue w-full  p-9">
          <h2 className="text-2xl">Inscription</h2>
          <div className="flex flex-col w-4/5 border-black gap-9 p-9 w-full">
            <div className="email-container">
              <input type="text" placeholder="Adresse email" value={email} onChange={handleChangeEmail} className="h-10 border border-white border-3 bg-transparent placeholder-white email"></input>
            </div>
            <div className="password-container">
              <input type="password" placeholder="Mot de passe" value={password} onChange={handleChangePassword} className="h-10 border border-white border-3 bg-transparent placeholder-white password"></input>
            </div>

            <button onClick={signUp} className="bg-light-red rounded-2xl h-12 text-2xl ">
              Inscription
            </button>

            <Link href="/login" className="m-auto text-xs underline cursor-pointer">
              <p>Vous avez déjà un compte ? Se connecter</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
