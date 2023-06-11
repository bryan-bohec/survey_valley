import { useEffect } from "react";
import "./survey.css";

export default function SurveyCard({nom, description, actif, backgroundUrl}) {
    useEffect(()=> {
        console.log(actif)
    },[])
  return (
    <div className={`w-80 ${!actif ? 'gris' : ''} h-96 relative cursor-pointer surveyCard`} style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: "cover" }}>
      <h3 className="text-center text-white mt-2 text-xl font-bold mx-2 title p-2 bg-light-red">{nom}</h3>
      {!actif ? <h3 className={" text-center text-white mt-2 text-xl font-bold mx-2 title p-2 px-4 bg-blue-700"}>A venir</h3> : null}
      <div className="desc">
        <div className="text">{description}</div>
      </div>
    </div>
  );
}
