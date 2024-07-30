import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Accueil from "./scenes/Accueil";
import Candidat from "./scenes/Candidat";
import CandidatP from "./scenes/CandidatP";
import Profile from "./scenes/Profile";
import ProfileP from "./scenes/ProfileP";
import DashboardGlobal from "./scenes/DashboardGlobal";
import Login from "./scenes/Login";
import Absence  from "./scenes/Absence";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Candidatures from "./scenes/Candidatures";
import Postes from "./scenes/Postes";
import Signup from "./scenes/Signup";
import Recrutement from "./scenes/Recrutement";
import EntréesSorties from "./scenes/EntréesSorties";
import Candidats from "./scenes/Candidats";
import Demandes from "./scenes/Demandes";
import Employes from "./scenes/Rapports/Employes";
import CandidatsR from "./scenes/Rapports/CandidatsR";
import PostesR from "./scenes/Rapports/PostesR";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarLogin, setIsSidebarLogin] = useState(true);
  const [isTopbarLogin, setIsTopbarLogin] = useState(true);
  const [userRole, setUserRole] = useState(null); // État pour stocker le rôle de l'utilisateur

  const location = useLocation();
  // Vérifier le rôle de l'utilisateur au chargement de la page
  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role); // Définir le rôle dans l'état local
    }
  }, []);
 
  // Set isSidebar to false if the current path is '/login', otherwise set it to true
  useState(() => {
    setIsSidebarLogin(location.pathname !== '/login' && location.pathname !== '/signup');
    setIsTopbarLogin(location.pathname !== '/login' && location.pathname !== '/signup');
   
  }, [location.pathname]);
 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {isSidebarLogin && <Sidebar userRole={userRole} />}
       
          <main className="content">
            {isTopbarLogin  && <Topbar setIsSidebarLogin={setIsSidebarLogin} />}
            <Routes>
            
             
              <Route path="/" element={<Accueil />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/candidat" element={<Candidat />} />
              <Route path="/Candidats" element={<Candidats />} />
              <Route path="/candidatP" element={<CandidatP />} />
              <Route path="/Demandes" element={<Demandes />} />
              <Route path="/EntréesSorties" element={<EntréesSorties />} />
              <Route path="/Postes" element={<Postes />} />
              <Route path="/Candidatures" element={<Candidatures/>} />
              <Route path="/DashboardGlobal" element={<DashboardGlobal />} />
              <Route path="/PostesR" element={<PostesR/>} />
              <Route path="/CandidatsR" element={<CandidatsR />} />
              <Route path="/Employes" element={<Employes/>} />
              <Route path="/Recrutement" element={<Recrutement/>} />

              <Route path="/Signup" element={<Signup/>} />
              <Route path="/Absence" element={<Absence />} />
              <Route path="/ProfileP/:id" element={<ProfileP />} />
              <Route path="/Profile/:id" element={<Profile />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
