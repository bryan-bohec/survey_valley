"use client";
import "./profile.css";
import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../UserContext";

export default function Profile() {
  const { user, updateUser, getUser } = useContext(UserContext);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();



  const handleSelectVille = (event) => {
    const selectedValue = event.target.value;
    const ville = villes.find((v) => v.nom === selectedValue);
    setValue("codePostal", ville.codePostal);
    clearErrors("ville");
  };


  const onSubmit = async (data) => {
    const valid = await updateUser({profile : data})
    console.log(valid)
    if (valid) {
      setShowSaveMessage(true)
      setTimeout(()=> setShowSaveMessage(false), 3000)
    } else {
      alert("Une erreur est survenue.")
    }
    
  };

  useEffect(() => {
    if (user?.user_metadata?.userData?.profile) {
      const {nom, prenom, dateNaissance, numeroTel, ville, codePostal, adresse} = user.user_metadata.userData.profile
      setValue("nom", nom);
      setValue("prenom", prenom);
      setValue("dateNaissance", dateNaissance);
      setValue("numeroTel", numeroTel);
      setValue("ville", ville);
      setValue("codePostal", codePostal);
      setValue("adresse", adresse);
    } else {
      console.log("User document does not exist");
    }
    if (user) {
      console.log(user)
    } else {
      console.log("aa")
    }

  }, [user]);

  return (
    <div>
      <h2 className="font-bold text-3xl mb-2">Mettre à jour vos informations</h2>
      <hr className="mb-4"></hr>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap mb-6 gap-6">
          <div className="flex flex-col gap-2 profileForm">
            <input type="text" error={!!errors?.nom} {...register("nom", { required: "Champ obligatoire", pattern: { value: /[a-zA-Z]/, message: "Nom invalide" } })} placeholder="Nom" className="h-10 border border-white border-4 bg-transparent placeholder-white p-2"></input>
            <p className="helperText text-red-500 text-xs font-bold -mt-1">{errors?.nom ? errors.nom.message : null}</p>
            <input type="text" error={!!errors?.prenom} {...register("prenom", { required: "Champ obligatoire", pattern: { value: /[a-zA-Z]/, message: "Prénom invalide" } })} placeholder="Prenom" className="h-10 border border-white border-4 bg-transparent placeholder-white p-2"></input>
            <p className="helperText text-red-500 text-xs font-bold -mt-1">{errors?.prenom ? errors.prenom.message : null}</p>
            <input type="text" {...register("dateNaissance", { required: "Champ obligatoire", pattern: { value: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, message: "Date de naissance invalide" } })} placeholder="Date de naissance (jj/mm/aa)" className="h-10 border border-white border-4 bg-transparent placeholder-white p-2"></input>
            <p className="helperText text-red-500 text-xs font-bold -mt-1">{errors?.dateNaissance ? errors.dateNaissance.message : null}</p>
            <input type="text" error={!!errors?.numeroTel} {...register("numeroTel", { required: "Champ obligatoire", pattern: { value: /^\d{10}$/, message: "Numero de téléphone incorrect" } })} placeholder="Numéro de téléphone" className="h-10 border border-white border-4 bg-transparent placeholder-white p-2"></input>
            <p className="helperText text-red-500 text-xs font-bold -mt-1">{errors?.numeroTel ? errors.numeroTel.message : null}</p>
          </div>

          <div className="flex flex-col gap-2 profileForm">
            <select {...register("ville", { required: "Champ obligatoire" })} error={!!errors?.ville} onChange={handleSelectVille} className="h-10 border border-white border-4 bg-transparent placeholder-white p-2">
              <option value="" hidden defaultValue>
                Ville
              </option>
              {villes.map((v) => (
                <option className="bg-dark-blue" key={v.nom} value={v.nom}>
                  {v.nom}
                </option>
              ))}
            </select>
            <p className="helperText text-red-500 text-xs font-bold -mt-1">{errors?.ville ? errors.ville.message : null}</p>
            <input {...register("codePostal")} disabled type="text" placeholder="Code postal" className="h-10 border border-white border-4 bg-dark-blue placeholder-white p-2"></input>
            <input {...register("adresse", { required: "Champ obligatoire" })} error={!!errors?.adresse} type="text" placeholder="Adresse" className="h-10 border border-white border-4 bg-transparent placeholder-white p-2"></input>
            <p className="helperText text-red-500 text-xs font-bold -mt-1">{errors?.adresse ? errors.adresse.message : null}</p>
          </div>
          
        </div>

        <button type="submit" className="bg-light-red rounded-2xl h-12 text-2xl px-2">
          Sauvegarder
        </button>

      </form>
      
      {showSaveMessage &&  <h2 className="mt-2 text-green-500" >Vos données ont bien été enregistrés.</h2>}
    </div>
  );
}

const villes = [
  { nom: "Mont-de-Marsan", codePostal: "40192" },
  { nom: "Benquet", codePostal: "40037" },
  { nom: "Bostens", codePostal: "40050" },
  { nom: "Bougue", codePostal: "40051" },
  { nom: "Bretagne-de-Marsan", codePostal: "40055" },
  { nom: "Campagne", codePostal: "40061" },
  { nom: "Campet-et-Lamolère", codePostal: "40062" },
  { nom: "Gaillères", codePostal: "40103" },
  { nom: "Geloux", codePostal: "40111" },
  { nom: "Laglorieuse", codePostal: "40139" },
  { nom: "Lucbardez-et-Bargues", codePostal: "40162" },
  { nom: "Mazerolles", codePostal: "40178" },
  { nom: "Pouydesseaux", codePostal: "40234" },
  { nom: "Saint-Avit", codePostal: "40250" },
  { nom: "Saint-Martin-d'Oney", codePostal: "40274" },
  { nom: "Saint-Perdon", codePostal: "40280" },
  { nom: "Saint-Pierre-du-Mont", codePostal: "40281" },
  { nom: "Uchacq-et-Parentis", codePostal: "40320" },
];
