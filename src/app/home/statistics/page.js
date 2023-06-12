"use client";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import ResultTable from "./ResultTable";

export default function Statistics() {
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
      <h2 className="font-bold text-3xl mb-2">Voir les résultats</h2>
      <hr className="mb-4"></hr>
      <ResultTable surveys={surveys} />
    </div>
  );
}
