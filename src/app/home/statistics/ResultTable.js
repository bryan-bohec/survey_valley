"use client";
import { useEffect } from "react";

export default function ResultTable({ surveys }) {
  useEffect(() => {
    setTimeout(() => {
      console.log(surveys);
    }, 2000);
  }, [surveys]);
  return (
    <table>
      <tr className="border border-2 border-white">
        <th className="border border-2 border-white p-1" border-2 border-white>
          id
        </th>
        <th className="border border-2 border-white p-1">nom</th>
        <th className="border border-2 border-white p-1"> Statut</th>
      </tr>
      {surveys.map((s) => {
        return (
          <tr key={s.id} className={`${s.actif ? "" : "bg-dark-blue"}`}>
            <td className="border border-2 border-white p-1 ">{s.idSondage}</td>
            <td className={`border border-2 border-white p-1 ${s.actif ? "cursor-pointer underline" : ""}`}>{s.description}</td>
            <td className="border border-2 border-white p-1 ">{s.actif ? "En cours" : "A venir"}</td>
          </tr>
        );
      })}
    </table>
  );
}
