import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"; // Importer emailjs-com


const CandidatP = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cvFiles, setCvFiles] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const sortedData = [...tableData].sort((a, b) => b.predict_proba - a.predict_proba);
  const validCandidats = sortedData.filter((candidat) => candidat.predict_statut === "Validé");
  const validCandidatIds = validCandidats.map((candidat) => candidat.id);

  useEffect(() => {
    localStorage.setItem("candidatData", JSON.stringify(tableData));
  }, [tableData]);

  const navigate = useNavigate();
  const handleDetailsClick = (id) => {
    const candidate = tableData.find((item) => item.id === id);
    navigate(`/ProfileP/${id}`, { state: { candidate } });
  };

  const handleCVUpload = (event) => {
    const files = event.target.files;
    setCvFiles(files);
  };
  const sendEmailsToSelectedCandidates = () => {
    selectedCandidateIds.forEach((candidateId) => {
      const candidate = tableData.find((item) => item.id === candidateId);
      const candidateEmail = candidate.Email;
      console.log(candidate.Email);

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
    Array.from(cvFiles).forEach((file) => {
      formData.append("cvFiles", file);
    });

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
      let data = await response.json();
      console.log(data);

      data = data.map((item, index) => ({ ...item, id: index + 1 }));
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
          sx={{ height: 50, width: 50, borderRadius: "50%" }}
          alt={params.row.Email}
          src={params.row.Images}
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
      field: "Tel",
      headerName: "Numéro Téléphone",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "predict_proba",
      headerName: "Score",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "predict_statut",
      headerName: "Statut",
      minWidth: 120,
      flex: 1,
      renderCell: ({ row: { predict_statut } }) => {
        const getBackgroundColor = (predict_statut) => {
          switch (predict_statut) {
            case "Validé":
              return colors.greenAccent[600];
            case "Réfusé":
              return colors.redAccent[600];
            default:
              return colors.grey[700];
          }
        };

        const getIcon = (predict_statut) => {
          switch (predict_statut) {
            case "Validé":
              return <CheckCircleOutlineIcon />;
            case "Réfusé":
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
            backgroundColor={getBackgroundColor(predict_statut)}
            borderRadius="2px"
          >
            {getIcon(predict_statut)}
            <Typography color={colors.grey[100]} sx={{ ml: "2px" }}>
              {predict_statut}
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
      <Header title="Candidatures" subtitle="Gérer les candidatures spontanées" />
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
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="Sélectionner une liste de CV"
            variant="outlined"
            size="small"
            multiline
            rows={Math.max(1, cvFiles.length)}
            InputProps={{ readOnly: true }}
            sx={{ mr: 2, maxWidth: "none", width: "30%" }}
            value={cvFiles.length ? `${cvFiles.length} fichiers sélectionnés` : ""}
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
        <DataGrid
          checkboxSelection
          rows={sortedData}
          columns={columns}
          selectionModel={validCandidatIds}
          onSelectionModelChange={(ids) => setSelectedCandidateIds(ids)}
        />
      </Box>
    </Box>
  );
};

export default CandidatP;
