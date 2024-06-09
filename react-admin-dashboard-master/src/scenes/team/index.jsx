import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";

import { tokens } from "../../theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"; // Importer emailjs-com


const Candidat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cvFiles, setCvFiles] = useState([]);
  const [descriptionFile, setDescriptionFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [interviewCount, setInterviewCount] = useState(0);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const sortedData= [...tableData].sort((a, b) => b.Score - a.Score);
  const validCandidats = sortedData.filter(
    (candidat) =>
      candidat.Résultat === "Expert" || candidat.Résultat === "Medium"
  );  
  const validCandidatIds = validCandidats.map((candidat) => candidat.id);
  const location = useLocation();

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    } 
  }, []);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    // Charger les données à partir de la source de données initiale
    // Si vous avez une source de données comme une API, appelez-la ici
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/compare");
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (location.pathname === "/Candidat") {
      fetchData();
    }
  }, [location.pathname]);
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    const candidate = tableData.find((item) => item.id === id);
    navigate(`/Profile/${id}`, { state: { candidate } });
  };
  
  const handleInterviewCountChange = (event) => {
    setInterviewCount(event.target.value);
  };
  const handleCVUpload = (event) => {
    const files = event.target.files;
    setCvFiles(files);
  };

  const handleDescriptionUpload = (event) => {
    const file = event.target.files[0];
    setDescriptionFile(file);
  };
  const sendEmailsToSelectedCandidates = () => {
    selectedCandidateIds.forEach((candidateId) => {
      const candidate = tableData.find((item) => item.id === candidateId);
      const candidateEmail = candidate.Email;

      emailjs
        .send(
          "service_vuhzias", // Remplacez par votre service ID EmailJS
          "template_mzdnsar", // Remplacez par votre template ID EmailJS
          {
            to_email: candidateEmail,
            // Ajoutez d'autres variables du modèle d'e-mail si nécessaire
          },
          "eSkEu69BRALYkpPLM" // Remplacez par votre user ID EmailJS
        )
        .then((response) => {
          console.log("E-mail envoyé avec succès à", candidateEmail);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'envoi de l'e-mail à",
            candidateEmail,
            ":",
            error
          );
        });
    });
  };

  const handleSend = async () => {
    const formData = new FormData();
    formData.append("jobDescriptionFile", descriptionFile);
    Array.from(cvFiles).forEach((file) => {
      formData.append("cvFiles", file);
    });

    try {
      const response = await fetch("http://localhost:5000/compare", {
        method: "POST",
        body: formData,
      });
      let data = await response.json();
      console.log(data);

      // Ajouter un champ `id` incrémental à chaque ligne
      data = data.map((item, index) => ({ ...item, id: index + 1 }));

      data.sort((a, b) => b.Score - a.Score);

    // Sélectionner uniquement le candidat avec le score le plus élevé
    setSelectedCandidateIds(data.slice(0, interviewCount > 0 ? 1 : 0).map(candidate => candidate.id));
    
    setTableData(data);
    } catch (error) {
      console.error("Error sending files:", error);
    }
  };

  const columns = [
    //{ field: "id", headerName: "Numéro", minWidth: 70, flex: 1 },
    {
      field: "Images",
      headerName: "Image",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            borderRadius: "50%",
          }}
          alt={params.row.Email}
          src={params.row.Images[0]}
        />
      ),
    },
    {
      field: "Email",
      headerName: "Email",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "Score",
      headerName: "Score",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "Tel",
      headerName: "Numéro Téléphone",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "Résultat",
      headerName: "Statut",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => { // Destructurer row pour accéder à Résultat
        const { Résultat } = row; // Destructuring de Résultat depuis row

        const getBackgroundColor = (Résultat) => {
          switch (Résultat) {
            case "Expert":
              return colors.greenAccent[600];
            case "Medium":
              return colors.orange[700];
            case "Débutant":
              return  colors.redAccent[600];
            default:
              return colors.grey[700];
          }
        };

        const getIcon = (Résultat) => {
          switch (Résultat) {
            case "Expert":
              return <CheckCircleOutlineIcon />;
            case "Medium":
              return <CloudUploadIcon />;
            case "Débutant":
              return <CancelIcon />;
            default:
              return <SecurityOutlinedIcon />;
          }
        };

        return (
          <Box
            width="100%"
            m="0 auto"
            p="2px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={getBackgroundColor(Résultat)}
            borderRadius="2px"
          >
            {getIcon(Résultat)}
            <Typography color={colors.grey[100]} sx={{ ml: "2px" }}>
              {Résultat}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "details",
      headerName: "Détails",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDetailsClick(params.row.id)}
        >
          Détails
        </Button>
      ),
    },
    
  ];
  return (
    <Box m="20px">
  <Header title="Candidatures" subtitle="Gérer les candidatures par poste" />
  <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiButton-root": {
            width: "auto",
            minWidth: "auto",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mb={2}
        >
          <Box display="flex" alignItems="center" mb={2}>
            
            <TextField
              label="Sélectionner une description de poste"
              variant="outlined"
              size="small"
              multiline
              rows={descriptionFile ? 1 : 0}
              InputProps={{ readOnly: true }}
              sx={{ mr: 2, maxWidth: "none", width: "100%" }}
              value={descriptionFile ? descriptionFile.name : ""}
            />
            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="description-upload"
              type="file"
              onChange={handleDescriptionUpload}
            />
            <label htmlFor="description-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ mr: 3 }}
              >
                Upload Description
              </Button>
            </label>
            <TextField
              label="Nombre d'interviews"
              type="number"
              variant="outlined"
              size="small"
              value={interviewCount}
              onChange={handleInterviewCountChange}
              sx={{ mr: 2, maxWidth: "none", width: "50%" }}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            className="flex-grow"
            mb={1}
          >
            <TextField
              label="Sélectionner une liste de CV"
              variant="outlined"
              size="small"
              multiline
              rows={Math.max(1, cvFiles.length)}
              InputProps={{ readOnly: true }}
              sx={{ mr: 2, maxWidth: "none", width: "200%" }}
              value={cvFiles.length ? `${cvFiles.length} files selected` : ""}
            />
            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="cv-upload"
              multiple
              type="file"
              onChange={handleCVUpload}
            />
            <label htmlFor="cv-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ mr: 3 }}
              >
                Upload CV
              </Button>
            </label>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSend}
              sx={{ width: "auto", minWidth: "auto" }}
            >
              Envoyer
            </Button>
            <Button
            variant="contained"
            color="primary"
            onClick={sendEmailsToSelectedCandidates}
            sx={{ width: "auto", minWidth: "auto", ml: 3 }}
          >
            Envoyer E-mail
          </Button>
          </Box>
        </Box>
        <DataGrid
  checkboxSelection
  rows={sortedData}
  columns={columns}
  selectionModel={selectedCandidateIds}
  onSelectionModelChange={(ids) => {
    // Limiter le nombre de candidats sélectionnés au nombre d'interviews spécifié
    if (ids.length <= interviewCount) {
      setSelectedCandidateIds(ids);
    } else {
      // Si le nombre de candidats sélectionnés dépasse le nombre d'interviews,
      // ne sélectionner que les premiers candidats valides jusqu'au nombre spécifié
      setSelectedCandidateIds(ids.slice(0, interviewCount));
    }
  }}
/>
<Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={sendEmailsToSelectedCandidates}
            sx={{ width: "auto", minWidth: "auto" }}
          >
            Envoyer Email
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Candidat;