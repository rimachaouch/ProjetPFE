import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const  Postes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box >
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Typography variant="h3" >
        Analyse des postes ouverts et pourvus
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" >
        <iframe
        src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Crchaouch%5CDocuments%5CQlik%5CSense%5CApps%5CRim_Chaouch_UI(1)(2).qvf&sheet=205151ec-8be8-45db-b5fb-f3da3cbc34bf&theme=card&opt=ctxmenu"
          style={{ border: "none", width: "1000px", height: "500px" }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default Postes;
