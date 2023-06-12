"use client"
import { useRouter } from "next/navigation";
import Resultats from "./resultats/Resultats"
import Link from "next/link";
export default function Stat({params}) {
  const router = useRouter();

  return (
  <div>
    <Link href="/home/statistics" className="mb-8 underline">Revenir à la liste</Link>
    <Resultats/>
  </div>)
  ;
}
