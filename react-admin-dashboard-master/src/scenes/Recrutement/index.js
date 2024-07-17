import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const  Recrutement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="2px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center" mb="20px">
        <Typography variant="h3" >
        Vue globale de recrutement de l'années courante
        </Typography>
      </Box>

      {/* Contenu */}
      <Box display="flex" justifyContent="center" mt="5px">
        <iframe
        src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Crchaouch%5CDocuments%5CQlik%5CSense%5CApps%5CRim_Chaouch_UI(1)(2).qvf&sheet=29823c05-4811-4b20-9f44-e2b1daf23995&theme=card&opt=ctxmenu"
          style={{ border: "none", width: "1100px", height: "600px" }}
        ></iframe>
      </Box>
    </Box>
  );
};


export default Recrutement;
