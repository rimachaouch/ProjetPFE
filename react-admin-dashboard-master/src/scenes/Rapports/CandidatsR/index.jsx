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
        Rapport détaillé des candidats
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" >
        <iframe
         src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Crchaouch%5CDocuments%5CQlik%5CSense%5CApps%5CRim_Chaouch_UI(1)(2).qvf&sheet=99f5c67f-4cfa-45d2-821b-d37e60029ae4&theme=card&opt=ctxmenu&select=clearall" 
          style={{ border: "none", width: "950px", height: "500px" }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default Demandes;
