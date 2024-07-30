import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const  Demandes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="2px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" mb="10px">
        <Typography variant="h3" >
        Analyse des demandes personnelles
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" >
        <iframe
        src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Crchaouch%5CDocuments%5CQlik%5CSense%5CApps%5CRim_Chaouch_UI(1)(2).qvf&sheet=7e66a008-b7fd-44b4-a411-472e9f0018eb&theme=card&opt=ctxmenu"
        scrolling="none"  style={{ overflow:"hidden", border: "none", width: "1120px", height: "630px" }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default Demandes;
