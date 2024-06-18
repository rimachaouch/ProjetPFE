import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const  DasboardGloabal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Header = ({ subtitle }) => {
    return (
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'black' }}>
        {subtitle}
      </Typography>
    );
  }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header subtitle="Vue globale de recrutement de l'années courante"/>
      </Box>

      {/* VIDEO SECTION */}
      <Box mt="20px">
        <Typography variant="h6" color={colors.grey[100]} gutterBottom>
         
        </Typography>
        <Box display="flex" justifyContent="center">
         
        </Box>
      </Box>
    </Box>
  );
};

export default DasboardGloabal;