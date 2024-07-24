import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";

const  Demandes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box >
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Typography variant="h3" >
        Rapport détaillé des employées
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" >
        <iframe
        src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Crchaouch%5CDocuments%5CQlik%5CSense%5CApps%5CRim_Chaouch_UI(1)(2).qvf&sheet=96859d6d-4de4-4b30-b34f-e5df046043b4&theme=card&opt=ctxmenu&select=clearall" 
        scrolling="none"  style={{ overflow:"hidden", border: "none", width: "1120px", height: "630px" }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default Demandes;
