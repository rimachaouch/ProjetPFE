import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Candidat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const MySwal = withReactContent(Swal);
  const [cvFiles, setCvFiles] = useState([]);
  const [descriptionFile, setDescriptionFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [interviewCount, setInterviewCount] = useState(0);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const sortedData = [...tableData].sort((a, b) => b.Score - a.Score);
  const validCandidats = sortedData.filter(
    (candidat) =>
      candidat.Résultat === "Expert" || candidat.Résultat === "Medium"
  );
  const validCandidatIds = validCandidats.map((candidat) => candidat.id);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
    const storedSelectedIds = localStorage.getItem("selectedCandidateIds");
    if (storedSelectedIds) {
      setSelectedCandidateIds(JSON.parse(storedSelectedIds));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/compare");
        const data = await response.json();
        setTableData(data);
        localStorage.setItem("tableData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (location.pathname === "/Candidat") {
      fetchData();
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("selectedCandidateIds", JSON.stringify(selectedCandidateIds));
  }, [selectedCandidateIds]);

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
        handleSendEmails();
      }
    });
  };

  const handleSendEmails = () => {
    selectedCandidateIds.forEach((candidateId) => {
      const candidate = tableData.find((item) => item.id === candidateId);
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

        
    data = data.map((item, index) => ({
      ...item,
      Score: item.Score ,
      id: index + 1,
    }));

      data.sort((a, b) => b.Score - a.Score);

      setSelectedCandidateIds(
        data.slice(0, interviewCount > 0 ? interviewCount : 0).map((candidate) => candidate.id)
      );

      setTableData(data);
      localStorage.setItem("tableData", JSON.stringify(data));
    } catch (error) {
      console.error("Error sending files:", error);
    }
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
      minWidth: 170,
      flex: 1,
    },
    {
      field: "Score",
      headerName: "Score",
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        const formattedScore = `${Math.round(params.value)}%`;
        return <Typography>{formattedScore}</Typography>;
    },
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
      renderCell: ({ row }) => {
        const { Résultat } = row;

        const getBackgroundColor = (Résultat) => {
          switch (Résultat) {
            case "Expert":
              return colors.greenAccent[400];
            case "Medium":
              return colors.orange[500];
            case "Débutant":
              return colors.redAccent[600];
            default:
              return colors.grey[700];
          }
        };

        const getIcon = (Résultat) => {
          switch (Résultat) {
            case "Expert":
              return <StarIcon />;
            case "Medium":
              return <TrendingUpIcon />;
            case "Débutant":
              return <SchoolIcon />;
            default:
              return <HelpOutlineIcon />;
          }
        };

        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
            backgroundColor={getBackgroundColor(Résultat)}
          >
            {getIcon(Résultat)}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {Résultat}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Details",
      headerName: "Details",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleDetailsClick(row.id)}
          >
            Détails
          </Button>
        );
      },
    },
  ];
  const Header = ({ subtitle }) => {
    return (
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'black' }}>
        {subtitle}
      </Typography>
    );
  }
  return (
    <Box m="20px">
      <Header subtitle="Gérer les candidatures par poste" />
      <Box
        m="40px 0 0 0"
        minHeight="300px"
        height={`calc(${sortedData.length * 52}px + 120px)`}
        maxHeight="75vh"
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
              label="Nombres d' entretiens"
              type="number"
              display="flex"
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
              sx={{ width: "auto", minWidth: "auto" ,backgroundColor: '#db4059' }}
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
        </Box>
        <DataGrid
          checkboxSelection
          rows={sortedData}
          columns={columns}
          selectionModel={selectedCandidateIds}
          onSelectionModelChange={(ids) => {
            if (ids.length <= interviewCount) {
              setSelectedCandidateIds(ids);
            } else {
              setSelectedCandidateIds(ids.slice(0, interviewCount));
            }
          }}
        />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Candidat;
