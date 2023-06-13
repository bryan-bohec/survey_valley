import { useEffect } from "react";
import "./survey.css";
import { useRouter } from "next/navigation";

export default function SurveyCard({ id, nom, description, actif, backgroundUrl, user }) {
  const router = useRouter();

  //const aRepondu = user?.user_metadata?.userData?.aRepondu?.includes(id);

  useEffect(() => {
    console.log(user);
  });

  const navigate = (actif) => {
    if (actif) {
      if (!user.user_metadata?.userData?.profile) {
        alert("Veuillez configurer votre profil avant de répondre au sondage");
      } else {
        router.push("/home/surveys/" + id);
      }
    } else {
      alert("Ce sondage sera disponible prochainement");
    }
  };
  return (
    <div onClick={() => navigate(actif)} className={`w-80 ${!actif ? "gris" : ""} h-96 relative cursor-pointer surveyCard`} style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: "cover" }}>
      <h3 className="text-center text-white mt-2 text-xl font-bold mx-2 title p-2 bg-light-red">{nom}</h3>
      {!actif ? <h3 className={" text-center text-white mt-2 text-xl font-bold mx-2 title p-2 px-4 bg-blue-700"}>A venir</h3> : null}
      {/* {aRepondu ? <h3 className={" text-center text-white mt-2 text-xl font-bold mx-2 title p-2 px-4 bg-blue-700"}>Répondu</h3> : null} */}
      <div className="desc">
        <div className="text">{description}</div>
      </div>
    </div>
  );
}
