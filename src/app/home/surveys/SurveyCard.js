import { useEffect } from "react";
import "./survey.css";
import { useRouter } from "next/navigation";

export default function SurveyCard({id, nom, description, actif, backgroundUrl}) {
  const router = useRouter();
    
  const navigate = (actif) => {
    if (actif) {
      router.push("/home/surveys/" + id);
      console.log("test")
    } else {
      alert("Ce sondage sera disponible prochainement");
      console.log("tesaaa")
    }
  };
  return (
    <div onClick={()=> navigate(actif)} className={`w-80 ${!actif ? 'gris' : ''} h-96 relative cursor-pointer surveyCard`} style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: "cover" }}>
      <h3 className="text-center text-white mt-2 text-xl font-bold mx-2 title p-2 bg-light-red">{nom}</h3>
      {!actif ? <h3 className={" text-center text-white mt-2 text-xl font-bold mx-2 title p-2 px-4 bg-blue-700"}>A venir</h3> : null}
      <div className="desc">
        <div className="text">{description}</div>
      </div>
    </div>
  );
}
