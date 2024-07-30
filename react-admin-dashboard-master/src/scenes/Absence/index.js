import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const  Absence = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="2px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" mb="5px">
        <Typography variant="h3" >
          Analyse globale des absences
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" mt="5px">
        <iframe
src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Crchaouch%5CDocuments%5CQlik%5CSense%5CApps%5CRim_Chaouch_UI(1)(2).qvf&sheet=74b493fa-847e-4668-ba91-aacccf550358&theme=card&opt=ctxmenu"   
scrolling="none"  style={{ overflow:"hidden", border: "none", width: "1120px", height: "630px" }}
></iframe>
      </Box>
    </Box>
  );
};

export default Absence ;
