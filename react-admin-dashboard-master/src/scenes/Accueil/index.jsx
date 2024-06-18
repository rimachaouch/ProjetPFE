import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Vidéo from "./Vidéo.mp4";
import "./Accueil.css"; // Assurez-vous de créer ce fichier CSS

const Accueil = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="accueil-container">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" className="header-container">
        <Header subtitle="L’Analytics au service de la stratégie RH et de la Responsabilité d’Entreprise" />
      </Box>

      {/* VIDEO SECTION */}
      <Box className="video-section">
        <Box className="video-container">
          <video className="fixed-height-video" controls>
            <source src={Vidéo} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </Box>
      </Box>
    </Box>
  );
};

export default Accueil;
