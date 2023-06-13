"use client";
import { useState, useEffect, useContext } from "react";
import SurveyCard from "./SurveyCard";
import supabase from "../../config/supabase";
import { UserContext } from "../../UserContext";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const { getUser, user } = useContext(UserContext);

  const fetchSurveys = async () => {
    let { data: surveys_data, error } = await supabase.from("surveys_data").select("*");

    if (surveys_data) {
      setSurveys(surveys_data);
    } else {
      alert("Erreur de chargement des sondages");
    }
  };

  useEffect(() => {
    getUser();
    fetchSurveys();
  }, []);

  return (
    <div>
      <h2 className="font-bold text-3xl mb-2">Les sondages du moment</h2>
      <hr className="mb-4"></hr>
      <div className="flex flex-wrap gap-6">
        {surveys.map((s) => (
          <SurveyCard key={s.id} id={s.id} user={user} nom={s.nom} description={s.description} actif={s.actif} backgroundUrl={s.backgroundUrl} />
        ))}
      </div>
    </div>
  );
}
