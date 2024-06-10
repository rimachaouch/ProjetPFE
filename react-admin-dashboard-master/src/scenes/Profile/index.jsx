import React from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import { List, ListItem, ListItemText } from "@mui/material";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const { candidate } = location.state || {};

  if (!candidate) {
    return <Typography>Pas de candidat sélectionné.</Typography>;
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROFILE" subtitle="Candidate Profile" />

        
      </Box>
      {/* GRID */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="100px"
        gap="40px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100px"
        >
          <StatBox
            title="Profile score"
            //subtitle={candidate.Résultat}
            progress={`${candidate.Score/100}`}
            increase={`${candidate.Score}%`}
            icon={
              <AccountCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100px"
        >
          <StatBox
            title="Skill match score"
            //subtitle="Sales Obtained"
            progress={`${candidate.skill_match_score/100}`}
            increase={`${candidate.skill_match_score}%`}
            icon={
              <VerifiedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 - Candidate Profile */}
        <Box gridColumn="span 12" mt={4}>
          <Typography variant="h4" gutterBottom>
            Profil du Candidat
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Email" secondary={candidate.Email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Numéro Téléphone" secondary={candidate.Tel} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Diplôme" secondary={candidate.Diplôme} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Langues" secondary={candidate.Langues} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Compétences" secondary={candidate.Compétences} />
            </ListItem>
          </List>
          <Typography variant="h6" gutterBottom>
            Images Extraites
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {candidate.Images.map((image, index) => (
              <Box key={index} p="10px">
                <img src={image} alt={`extracted-${index}`} style={{ width: "100px" }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
