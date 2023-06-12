"use client";
import { useState, useEffect } from "react";
import ResultTable from "./ResultTable";
import supabase from "../../config/supabase";

export default function Statistics() {
  const [surveys, setSurveys] = useState([]);

  const fetchSurveys = async () => {
    let { data: surveys_data, error } = await supabase.from("surveys_data").select("*");

    if (surveys_data) {
      setSurveys(surveys_data);
    } else {
      alert("Erreur de chargement des sondages");
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div>
      <h2 className="font-bold text-3xl mb-2">Voir les résultats</h2>
      <hr className="mb-4"></hr>
      <ResultTable surveys={surveys} />
    </div>
  );
}
