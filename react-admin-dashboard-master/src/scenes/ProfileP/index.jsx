import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Avatar, Button, Link, Box, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { LinkedIn, GitHub, Email, Phone, School, Build, AccountCircle as AccountCircleIcon, VerifiedUser as VerifiedIcon, Language, ContactMail } from '@mui/icons-material'; // Importation des icônes Language et ContactMail
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import { blueGrey } from '@mui/material/colors';
//import aboutPic from './user.png';

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const { candidate } = location.state || {};

    if (!candidate) {
        return <Typography>Pas de candidat sélectionné.</Typography>;
    }
    
    return (
        <Box>
            <Box m="5px">
                {/* IMAGE */}
                <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                    {candidate.Texte_CV?.Images.map((image, index) => (
                        <Box key={index} p="10px">
                            <img
                                src={`http://localhost:5000/images/${image}`}
                                alt={`extracted-${index}`}
                                style={{
                                    width: "150px",
                                    borderRadius: "60%" // Définit le bord de l'image comme circulaire
                                }}
                            />
                        </Box>
                    ))}
                </Grid>

                {/* TEXT */}
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '2px' }}>{candidate.Email}</Typography>
                
                {/* GRID */}
                <Container>
                    {/* About Section */}
                    <Box id="about" sx={{ mt: 2 }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    {/* ICONS */}
                                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <GitHub fontSize="small" sx={{ color: 'black', mr: 1 }} />
                                            <LinkedIn fontSize="small" sx={{ color: '#0A66C2', mr: 1 }} />
                                            <Email fontSize="small" sx={{ color: 'red', mr: 1 }} />
                                        </Box>
                                    </Grid>
                                    {/* ROW 1 */}
                                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                                        <Box
                                        
                                            backgroundColor={colors.primary[400]}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            marginTop="5px"
                                        >
                                            <StatBox
                                                title="Selection probability"
                                                //subtitle={candidate.Résultat}
                                                progress={`${candidate.predict_proba/100}`} // Using the converted string
                                                increase={`${candidate.predict_proba}%`}
                                                icon={
                                                    <AccountCircleIcon
                                                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                                    />
                                                }
                                            />
                                        </Box>
                                    </Grid>
                                    {/* ROW 2 */}
                                    <Grid item xs={12} sm={6} style={{ marginTop: '5px' }}>
                                        <Card style={{ height: '100%', marginTop: '0' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Build fontSize="large" sx={{ color: 'orange', marginRight: '10px' }} /> {/* Changer la couleur et ajouter une marge à droite */}
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Compétences</Typography>
                                                </Box>
                                                <Typography variant="body2">{candidate.Compétences}<br /></Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{ marginTop: '5px' }}>
                                        <Card style={{ height: '100%', marginTop: '0' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <School fontSize="large" sx={{ color: '#8B0000', marginRight: '10px' }} /> {/* Changer la couleur et ajouter une marge à droite */}
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Diplôme</Typography>
                                                </Box>
                                                <Typography variant="body2">{candidate.Diplôme}<br /></Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    {/* ROW 3 */}
                                    <Grid item xs={12} sm={6} style={{ marginTop: '5px' }}>
                                        <Card style={{ height: '100%', marginTop: '0' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Language fontSize="large" sx={{ color: 'black', marginRight: '10px' }} /> {/* Changer la couleur et ajouter une marge à droite */}
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Langues</Typography>
                                                </Box>
                                                <Typography variant="body2">{candidate.Langues}<br /></Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{ marginTop: '5px' }}>
                                        <Card style={{ height: '100%', marginTop: '0' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ContactMail fontSize="large" sx={{ color: '#0077CC', marginRight: '10px' }} /> {/* Petite icône d'email */}
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact</Typography>
                                                </Box>
                                                <Typography variant="body1" sx={{ marginRight: '40px' }}>
                                                    <Email fontSize="small" sx={{ color: 'red', marginRight: '5px' }} /> {/* Petite icône d'email */}
                                                    {candidate.Email}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <Phone fontSize="small" sx={{ color: '#2E8B57', marginRight: '5px' }} /> {/* Petite icône de téléphone */}
                                                    {candidate.Tel}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Profile;
