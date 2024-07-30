import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, useTheme, Dialog, Snackbar, Alert, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CandidatP = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cvFiles, setCvFiles] = useState([]);
  const [tableDataP, setTableDataP] = useState([]);
  const MySwal = withReactContent(Swal);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const sortedDataP = [...tableDataP].sort((a, b) => b.predict_proba - a.predict_proba);
  const validCandidats = sortedDataP.filter((candidat) => candidat.predict_statut === "Validé");
  const validCandidatIds = validCandidats.map((candidat) => candidat.id);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const storedDataP = localStorage.getItem("tableDataP");
    if (storedDataP) {
      setTableDataP(JSON.parse(storedDataP));
    }
  }, []);

  const navigate = useNavigate();
  const handleDetailsClick = (id) => {
    const candidate = tableDataP.find((item) => item.id === id);
    navigate(`/ProfileP/${id}`, { state: { candidate } });
  };

  const handleCVUpload = (event) => {
    const files = event.target.files;
    setCvFiles(files);
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
      setTableDataP(data);
      localStorage.setItem("tableDataP", JSON.stringify(data));

    } catch (error) {
      console.error("Error sending files:", error);
    }
  };

  const confirmSendEmails = () => {
    MySwal.fire({
      title: 'Confirmer l\'envoi d\'e-mail',
      text: 'Êtes-vous sûr de vouloir envoyer des e-mails aux candidats sélectionnés ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, envoyer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        sendEmailsToSelectedCandidates();
      }
    });
  };

  const sendEmailsToSelectedCandidates = () => {
    validCandidatIds.forEach((candidateId) => {
      const candidate = tableDataP.find((item) => item.id === candidateId);
      const candidateEmail = candidate.Email;

      emailjs
        .send(
          "service_vuhzias",
          "template_mzdnsar",
          {
            to_email: candidateEmail,
          },
          "eSkEu69BRALYkpPLM"
        )
        .then((response) => {
          console.log("E-mail envoyé avec succès à", candidateEmail);
          setSnackbarMessage(`E-mail envoyé avec succès à ${candidateEmail}`);
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'envoi de l'e-mail à",
            candidateEmail,
            ":",
            error
          );
          setSnackbarMessage(`Erreur lors de l'envoi de l'e-mail à ${candidateEmail}`);
          setOpenSnackbar(true);
        });
    });
    setOpenDialog(false);
  };

  const columns = [
    {
      field: "Images",
      headerName: "Images",
      minWidth: 70,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            {row.Texte_CV?.Images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/images/${image}`}
                alt={`Image ${index}`}
                style={{ width: 50, height: 50, marginRight: 5 }}
              />
            ))}
          </Box>
        );
      },
    },
    {
      field: "Email",
      headerName: "Email",
      minWidth: 190,
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
      renderCell: (params) => {
        const formattedScore = `${Math.round(params.value)}%`;
        return <Typography>{formattedScore}</Typography>;
    },
  },
    {
      field: "predict_statut" ,
      headerName: "Statut",
      minWidth: 120,
      flex: 1,
      renderCell: ({ row: { predict_statut } }) => {
        const getBackgroundColor = (predict_statut) => {
          switch (predict_statut) {
            case "Validé":
              return colors.greenAccent[400];
            case "Refusé":
              return colors.redAccent[600];
            default:
              return colors.grey[700];
          }
        };

        const getIcon = (predict_statut) => {
          switch (predict_statut) {
            case "Validé":
              return <CheckCircleOutlineIcon />;
            case "Refusé":
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

  const rowHeight = 52; // Height for each row
  const minRows = 5; // Minimum number of rows to display
  const maxRows = 10; // Maximum number of rows to display
  const visibleRows = Math.min(maxRows, Math.max(minRows, sortedDataP.length));
  const gridHeight = visibleRows * rowHeight;
  const Header = ({ subtitle }) => {
    return (
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'black' }}>
        {subtitle}
      </Typography>
    );
  }
  return (
    <Box m="20px">
      <Header subtitle="Gérer les candidatures spontanées" />
      <Box
        m="40px 0 0 0"
        height={`calc(${sortedDataP.length * 52}px + 120px)`} // Dynamic height calculation
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
            sx={{ width: "auto", minWidth: "auto", backgroundColor: '#db4059' }}
          >
            Envoyer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={confirmSendEmails}
            sx={{ width: "auto", minWidth: "auto", ml: 3 }}
          >
            Envoyer E-mail
          </Button>
        </Box>
        <DataGrid
          checkboxSelection
          rows={sortedDataP}
          columns={columns}
          selectionModel={validCandidatIds}
          onSelectionModelChange={(ids) => setSelectedCandidateIds(ids)}
          rowHeight={rowHeight}
        />
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmer l'envoi d'e-mail"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir envoyer des e-mails aux candidats sélectionnés ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={sendEmailsToSelectedCandidates} color="primary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CandidatP;
