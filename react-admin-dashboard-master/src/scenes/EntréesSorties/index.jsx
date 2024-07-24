import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const  EntréesSorties = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
    return (
      <Box m="2px">
        {/* HEADER */}
        <Box display="flex" justifyContent="center" alignItems="center" mb="10px">
          <Typography variant="h3" >
            Analyse des Entrées Sorties
          </Typography>
        </Box>
  
        {/* Contenu */}
        <Box display="flex" justifyContent="center" mt="5px">
          <iframe
          src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Crchaouch%5CDocuments%5CQlik%5CSense%5CApps%5CRim_Chaouch_UI(1)(2).qvf&sheet=1f151d58-2391-4051-8964-bba1fd421a1f&theme=card&opt=ctxmenu"
          scrolling="none"  style={{ overflow:"hidden", border: "none", width: "1120px", height: "630px" }}
          ></iframe>
        </Box>
      </Box>
    );
  };


export default EntréesSorties;
