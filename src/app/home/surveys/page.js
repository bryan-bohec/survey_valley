"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import SurveyCard from "./SurveyCard";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);

  const fetchSurveys = async () => {
    await getDocs(collection(db, "Sondages")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSurveys(newData.sort((a, b) => a.idSondage - b.idSondage));
      console.log(surveys, newData);
    });
  };

  useEffect(() => {
    fetchSurveys();
  }, []);
  return (
    <div>
      <h2 className="font-bold text-3xl mb-2">Les sondages du moment</h2>
      <hr className="mb-4"></hr>
      <div className="flex flex-wrap gap-6">
        {surveys.map((s) => (
          <SurveyCard key={s.idSondage} nom={s.nom} description={s.description} actif={s.actif} backgroundUrl={s.backgroundUrl} />
        ))}
      </div>
    </div>
  );
}
