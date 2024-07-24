import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const DashboardGlobal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box >
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" mb="10px">
        <Typography variant="h3" >
          Vue globale de ressource humaine
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" mt="5px">
        <iframe
        src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Crchaouch%5CDocuments%5CQlik%5CSense%5CApps%5CRim_Chaouch_UI(1)(2).qvf&sheet=27831597-b93a-4e4e-a30e-a9226368ad6f&theme=card&opt=ctxmenu"
        scrolling="none"  style={{ overflow:"hidden", border: "none", width: "1120px", height: "630px" }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default DashboardGlobal;
