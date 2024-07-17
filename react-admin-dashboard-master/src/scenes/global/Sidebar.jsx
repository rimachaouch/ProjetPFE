import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote"; // Icône pour Absence
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"; // Icône pour Recrutement
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"; // Icône pour Ressources Humaines

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAdd";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToReg";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp"; // Nouvelle icône pour Global
import CompareArrowsIcon from "@mui/icons-material/CompareArrows"; // Nouvelle icône pour Entrées Sorties
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const userRole = userInfo?.role;
  console.log("role",userInfo)
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          width: isCollapsed ? "100px" : "230px",
        },

        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
 padding: "3px 5px !important", // Ajustement du padding    
     },
        "& .pro-inner-item:hover": {
          color: "#db4059 !important",
        },
        "& .pro-menu-item.active": {
          color: "#c30010 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/images.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color="black">
                  Sopra HR Software
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>

          <Item
              title="Accueil"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Dashboard
            </Typography>
            <Item
                title="Global"
                to="/DashboardGlobal"
  icon={<PeopleOutlineIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
            <Item
                title="Absence"
                to="/Absence"
                icon={<EventNoteIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Entrées Sorties"
                to="/EntréesSorties"
                icon={<CompareArrowsIcon />} 
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Recrutement"
                to="/Recrutement"
                icon={<WorkOutlineIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Demandes Personnelles"
                to="/Demandes"
                icon={<PlaylistAddCheckIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Postes"
                to="/Postes"
                icon={<PostAddOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Candidatures"
                to="/Candidatures"
                icon={<AssignmentOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Candidats"
                to="/Candidats"
                icon={<GroupAddOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
               <SubMenu
                title="Rapports détaillés"
                icon={<ReportOutlinedIcon />}
                style={{
                  color: colors.grey[100],
                }}
              >
                <Item
                  title="Postes"
                  to="/PostesR"
                  icon={<PostAddOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Candidats"
                  to="/CandidatsR"
                  icon={<HowToRegOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Employés"
                  to="/Employes"
                  icon={<GroupOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>

            <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Gérer les Candidatures
            </Typography>
            <Item
                title="Par Postes"
               to="/candidat"
                icon={<FindInPageOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Spontanées"
               to="/candidatP"
                icon={<GroupAddOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
