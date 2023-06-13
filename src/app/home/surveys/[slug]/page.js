"use client";
import * as React from "react";
import supabase from "../../../config/supabase";
import { useState, useEffect, useContext } from "react";
import { Container } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Card, TextField } from "@mui/material";
import Aliment from "./Aliment";
import AlimentSelectionne from "./AlimentSelectionne";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { UserContext } from "../../../UserContext";
import MuiAlert from "@mui/material/Alert";

export default function QuestionnaireAliments({ params }) {
  const surveyId = params.slug;
  const { user, getUser, updateUser } = useContext(UserContext);
  const aRepondu = user?.user_metadata?.userData?.profile?.reponses?.includes(surveyId);
  const [aliments, setAliments] = useState([]);
  const [groupe, setGroupe] = useState([]);
  const [ssGroupe, setSsGroupe] = useState([]);
  const [ssSsGroupe, setSsSsGroupe] = useState([]);

  const [controlGroupe, setControlGroupe] = useState("");
  const [controlSsGroupe, setControlSsGroupe] = useState("");
  const [controlSsSsGroupe, setControlSsSsGroupe] = useState("");

  const [alimentsSelectionnes, setAlimentsSelectionnes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function loadAliments(value) {
    // let { data, error } = await supabase.from("food").select("*");
    // setAliments(data);
    let { data, error } = await supabase.from("food").select("*").eq("alim_ssssgrp_nom_fr", value).eq("alim_ssgrp_nom_fr", controlSsGroupe);
    setAliments(data);
  }

  async function loadGroupes() {
    let { data, error } = await supabase.from("food").select("alim_grp_nom_fr");
    let groupes = data.map((groupe) => groupe.alim_grp_nom_fr);
    let uniqueGroupes = [...new Set(groupes)];
    setGroupe(uniqueGroupes.sort());
  }

  async function loadSsGroupes(value) {
    let { data, error } = await supabase.from("food").select("alim_ssgrp_nom_fr").eq("alim_grp_nom_fr", value);
    let sousGroupes = data.map((sousGroupe) => sousGroupe.alim_ssgrp_nom_fr);
    let uniqueSousGroupes = [...new Set(sousGroupes)];
    console.log(uniqueSousGroupes);
    setSsGroupe(uniqueSousGroupes.sort());
  }

  async function loadSsSsGroupes(value) {
    let { data, error } = await supabase.from("food").select("alim_ssssgrp_nom_fr").eq("alim_ssgrp_nom_fr", value);
    let sousSousGroupes = data.map((sousSousGroupe) => sousSousGroupe.alim_ssssgrp_nom_fr);
    let uniqueSousSousGroupes = [...new Set(sousSousGroupes)];
    console.log(uniqueSousSousGroupes);
    setSsSsGroupe(uniqueSousSousGroupes.sort());
  }

  function ajouterAlimentSelectionne(aliment) {
    if (alimentsSelectionnes.length >= 10) {
      setOpen(true);
    } else {
      setAlimentsSelectionnes(alimentsSelectionnes.concat(aliment));
    }
  }

  function enleverAlimentSelectionne(aliment) {
    setAlimentsSelectionnes(alimentsSelectionnes.filter((alim) => alim.alim_nom_fr != aliment.alim_nom_fr));
  }

  function resetAliments() {
    setAliments([]);
  }

  useEffect(() => {
    loadGroupes();
  }, []);

  useEffect(() => {
    ssSsGroupe.length == 1 ? setControlSsSsGroupe(ssSsGroupe[0]) : setControlSsSsGroupe("");
  }, [ssSsGroupe]);

  useEffect(() => {
    if (ssSsGroupe.length == 1) {
      loadAliments(controlSsSsGroupe);
      console.log("test");
    }
  }, [controlSsGroupe]);

  useEffect(() => {
    alimentsSelectionnes.length == 10 ? setIsDialogOpen(true) : null;
  }, [alimentsSelectionnes]);

  function estDansAlimentsSelectionnes(aliment) {
    if (alimentsSelectionnes.some((alim) => alim.alim_nom_fr == aliment.alim_nom_fr)) {
      return true;
    }
    return false;
  }

  const sendData = async () => {
    console.log(user);
    getUser();
    if (!user?.user_metadata?.userData?.profile?.reponses) {
      let rep = [];
      rep.push(surveyId);
      const updatedProfile = {
        ...user.user_metadata.userData.profile, // spread existing profile attributes
        reponses: rep,
      };
      updateUser({ profile: updatedProfile });
    } else {
      let newReponses = user?.user_metadata?.userData?.profile?.reponses;
      newReponses.push(surveyId);
      const updatedProfile = {
        ...user.user_metadata.userData.profile, // spread existing profile attributes
        reponses: newReponses,
      };
      updateUser({ profile: updatedProfile });
    }

    const uid = user.id;
    let donnees = [];
    alimentsSelectionnes.map((aliment) => {
      donnees.push({ food_id: aliment.alim_code, user_id: uid });
    });
    console.log(donnees);
    await supabase.from("survey_results").insert(donnees).select("*");

    console.log(user);
  };

  //peut etre avoir tous les aliments, et faire un filter pour le dernier autocomplete
  //https://github.com/mui/material-ui/issues/23708
  //check drapeaux pour mettre une image

  //snackbar-------------------
  const [open, setOpen] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //snackbar------------------

  //filtre pour chercher les aliments --------
  const [filtre, setFiltre] = useState("");
  const handleChangeFiltre = (event) => {
    setFiltre(event.target.value);
  };
  function isSubstring(s1, s2) {
    // using indexOf method to check if s1 is
    // a substring of s2
    return s2.indexOf(s1);
  }
  //filtre pour chercher les aliments --------

  return (
    <div>
      {aRepondu && <h2>Vous avez répondu a ce sondage.</h2>}
      <Container className={aRepondu ? "!hidden" : ""}>
        <h2>Veuillez selectionner vos 10 aliments favoris</h2>
        <Card sx={{ p: 3, mb: 3 }}>
          <Grid container rowSpacing={2} columnSpacing={4}>
            <Grid xs={12} md={6}>
              <Autocomplete
                options={groupe}
                id="controlled-demo"
                value={controlGroupe}
                onChange={(event, newValue) => {
                  setFiltre("");
                  resetAliments();
                  setControlSsGroupe("");
                  setControlSsSsGroupe("");
                  setSsSsGroupe([]);
                  setControlGroupe(newValue);
                  loadSsGroupes(newValue);
                  console.log(ssGroupe);
                }}
                renderInput={(params) => <TextField {...params} label="Groupe d'aliments" variant="standard" />}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <Autocomplete
                options={ssGroupe}
                id="controlled-demo"
                value={controlSsGroupe}
                onChange={(event, newValue) => {
                  setFiltre("");
                  resetAliments();

                  setControlSsGroupe(newValue);
                  loadSsSsGroupes(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Sous groupes d'aliments" variant="standard" />}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <Autocomplete
                options={ssSsGroupe}
                id="controlled-demo"
                value={controlSsSsGroupe}
                onInputChange={(event, newValue) => {
                  setFiltre("");
                  setControlSsSsGroupe(newValue);
                  loadAliments(newValue);
                }}
                onChange={(event, newValue) => {
                  setControlSsSsGroupe(newValue);
                  loadAliments(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Spécialisations" variant="standard" />}
              />
            </Grid>
            {/* <Grid xs={12} md={6}></Grid> */}
            <Grid xs={12} md={6}>
              <TextField id="outlined-name" label="Filtrer" value={filtre} onChange={handleChangeFiltre} />
            </Grid>

            <Grid xs={12} md={12} sx={{ mt: 2 }}>
              <Divider />
            </Grid>

            {aliments.length >= 1
              ? aliments.map((alim) =>
                  isSubstring(filtre.toUpperCase(), alim.alim_nom_fr.toUpperCase()) != -1 ? (
                    <Grid key={alim.alim_nom_fr} xs={12} md={6}>
                      <Aliment aliment={alim} ajouterAlim={ajouterAlimentSelectionne} key={alim.alim_nom_fr} estDansAlimentsSelectionnes={estDansAlimentsSelectionnes(alim)} test={alimentsSelectionnes} enleverAlimentSelectionne={enleverAlimentSelectionne} />
                    </Grid>
                  ) : null
                )
              : null}
          </Grid>
        </Card>

        <Card sx={{ p: 3 }} className="alimCard">
          <h2>Aliments selectionnés ({alimentsSelectionnes.length} / 10)</h2>

          <Grid container rowSpacing={2} columnSpacing={4}>
            {alimentsSelectionnes.length >= 1
              ? alimentsSelectionnes.map((alim) => (
                  <Grid key={alim.alim_nom_fr} xs={12} md={6}>
                    <AlimentSelectionne aliment={alim} key={alim.alim_nom_fr} enleverAlimentSelectionne={enleverAlimentSelectionne} />
                  </Grid>
                ))
              : null}
          </Grid>
          <div className="sendBtn">
            <Button
              variant="contained"
              size="large"
              disabled={alimentsSelectionnes.length == 10 ? false : true}
              onClick={() => {
                sendData();
              }}
            >
              Envoyer
            </Button>
          </div>
        </Card>
      </Container>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnack} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: "100%" }}>
          Vous ne pouvez choisir que 10 aliments !
        </Alert>
      </Snackbar>
    </div>
  );
}

const images = {
  oui: "../assets/dinner-icon.png",
};
