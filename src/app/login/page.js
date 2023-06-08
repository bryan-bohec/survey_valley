import Image from "next/image";
import "../globals.css";
import "@fontsource/roboto";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center text-white font-roboto tracking-widest main-background">
      <div className="container flex bg-dark-blue px-14 py-9">

        <div className="flex flex-col bg-light-blue w-1/2 rounded-2xl items-center text-4xl tracking-normal font-bold p-9">
          <Image src="/surveyValley.png" alt="Description of the image" width={400} height={400} className="-mt-20 -mb-"/>
          <div className="text-center">
            <h3>Des sondages créées par votre agglomération pour mieux comprendre vos besoins</h3>
          </div>
        </div>

        <div className="flex flex-col bg-dark-blue w-1/2  p-9">
          <h2 className="text-2xl">Se connecter</h2>
          <div className="flex flex-col w-4/5 border-black gap-9 p-9 w-full">
            <div className="email-container">
              <input type="text" placeholder="Adresse email" className="h-10 border border-white border-3 bg-transparent placeholder-white email"></input>
            </div>
            <div className="password-container">
              <input type="password" placeholder="Mot de passe" className="h-10 border border-white border-3 bg-transparent placeholder-white password"></input>
            </div>
            <div>
            <input type="checkbox" name="remember" className="mr-4"></input>
            <label for="remember">Se souvenir de moi</label>
            </div>

            <button className="bg-light-red rounded-2xl h-12 text-2xl ">Connexion</button>
            <button className="text-center rounded-2xl h-12 border-white border-1 border flex justify-center items-center gap-4">
              <Image src="/google.png" alt="Description of the image" width={40} height={40}/>
              <p>Se connecter avec google</p>
            </button>

            <Link href="/register" className="m-auto text-xs underline cursor-pointer">
              <p>Vous n'avez pas de compte ? S'inscrire</p>
            </Link>
            
          </div>
        </div>
      </div>
    </main>
  );
}
