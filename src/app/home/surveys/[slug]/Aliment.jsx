import * as React from "react";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Card, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import dinnerIcon from "../../../assets/dinner-icon.png";
import bottle from "../../../assets/bottle.png";
import cookie from "../../../assets/cookie.png";
import epices from "../../../assets/epices.png";
import fish from "../../../assets/fish.png";
import fruits from "../../../assets/fruits.png";
import iceCream from "../../../assets/ice-cream.png";
import milkCarton from "../../../assets/milk-carton.png";
import biberon from "../../../assets/biberon.png";
import pasta from "../../../assets/pasta.png";
import transFat from "../../../assets/trans-fat.png";
import Image from "next/image";
import "./aliment.css";

export default function Aliment(props) {
  const alimData = props.aliment;

  return (
    <div className="flexAliment">
      <Image src={images[alimData.alim_grp_nom_fr]} alt="fsdf" />
      <div className="nom">
        <div>
          {alimData && alimData.alim_nom_fr}
          <div className="energy">
            kcal/100g : {alimData.energy_kcal100g}, kj/100g : {alimData.energy_kj100g}
          </div>
        </div>
      </div>

      {props.estDansAlimentsSelectionnes ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            props.enleverAlimentSelectionne(alimData);
          }}
          style={{ width: "100px" }}
        >
          Ajouté
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            props.ajouterAlim(alimData);
            console.log(props.test);
          }}
          style={{ width: "100px" }}
        >
          Ajouter
        </Button>
      )}
    </div>
  );
}

const images = {
  "aides culinaires et ingrédients divers": epices,
  "aliments infantiles": biberon,
  "eaux et autres boissons": bottle,
  "entrées et plats composés": dinnerIcon,
  "fruits, légumes, légumineuses et oléagineux": fruits,
  "glaces et sorbets": iceCream,
  "matières grasses": transFat,
  "produits laitiers et assimilés": milkCarton,
  "produits sucrés": cookie,
  "pâtes diverses, produits céréaliers": pasta,
  "viandes, oeufs, poissons et assimilés": fish,
};
