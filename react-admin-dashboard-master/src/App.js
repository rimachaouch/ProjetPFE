import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Accueil from "./scenes/Accueil";
import Candidat from "./scenes/Candidat";
import CandidatP from "./scenes/CandidatP";
import Contacts from "./scenes/contacts";
import Profile from "./scenes/Profile";
import ProfileP from "./scenes/ProfileP";
import DashboardGlobal from "./scenes/DashboardGlobal";
import Login from "./scenes/login";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Candidatures from "./scenes/Candidatures";
import Postes from "./scenes/Postes";
import EntréesSorties from "./scenes/EntréesSorties";
import Candidats from "./scenes/Candidats";
import Demandes from "./scenes/Demandes";
import Employes from "./scenes/Rapports/Employes";
import CandidatsR from "./scenes/Rapports/CandidatsR";
import PostesR from "./scenes/Rapports/PostesR";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isTopbar, setIsTopbar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre la connexion
  const location = useLocation();

  useEffect(() => {
    // Mise à jour des barres de navigation en fonction de la page actuelle
    const isLoginPage = location.pathname === '/login';
    setIsSidebar(!isLoginPage);
    setIsTopbar(!isLoginPage);
  }, [location.pathname]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isSidebar && <Sidebar />}
          <main className="content">
            {isTopbar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
              <Route path="/candidat" element={<Candidat />} />
              <Route path="/Candidats" element={<Candidats />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/candidatP" element={<CandidatP />} />
              <Route path="/Demandes" element={<Demandes />} />
              <Route path="/EntréesSorties" element={<EntréesSorties />} />
              <Route path="/Postes" element={<Postes />} />
              <Route path="/Candidatures" element={<Candidatures/>} />
              <Route path="/DashboardGlobal" element={<DashboardGlobal />} />
              <Route path="/PostesR" element={<PostesR/>} />
              <Route path="/CandidatsR" element={<CandidatsR />} />
              <Route path="/Employes" element={<Employes/>} />
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
