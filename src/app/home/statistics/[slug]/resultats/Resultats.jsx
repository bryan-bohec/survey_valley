"use client"
import * as React from "react";
import supabase from "../../../../config/supabase";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { Button, Card, TextField } from "@mui/material";
import Barchart from "./charts/Barchart";
import Piechart from "./charts/Piechart";

import "./resultats.css";
export default function Resultats(props) {
  const [mostPickedFoods, setMostPickedFoods] = useState([]);
  const [mostPickedGroups, setMostPickedGroups] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    getMostPickedFoods();
    getMostPickedGroups();
  }, []);

  async function getMostPickedFoods() {
    const { data, error } = await supabase.from("mostpickedfoods").select("alim_nom_fr, count");
    console.log(data);
    setMostPickedFoods(data);
  }

  async function getMostPickedGroups() {
    const { data, error } = await supabase.from("mostpickedgroups").select("alim_grp_nom_fr, count");
    console.log(data);
    setMostPickedGroups(data);
  }

  function nextGraph() {
    index < 1 ? setIndex(index => index + 1) : null 
  }
  function precedentGraph() {
    index > 0 ? setIndex(index => index - 1) : null
  }

  return (
    <Container>
      {index == 0 ? <Barchart data={mostPickedFoods} /> : null}
      {index == 1 ? <Piechart data={mostPickedGroups} /> : null}

      <Button variant="contained"  onClick={precedentGraph} style={{minWidth : "80px"}}>
        Précédent
      </Button>
      <Button variant="contained"  onClick={nextGraph} style={{minWidth : "80px"}}>
        Suivant
      </Button>
    </Container>

  );
}
