import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAdd";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToReg";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"; // Icône pour Ressources Humaines
import EventNoteIcon from "@mui/icons-material/EventNote"; // Ajout de l'icône EventNoteIcon

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

const Sidebar = ({ userRole }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selected, setSelected] = React.useState("Accueil");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          width: isCollapsed ? "80px" : "260px", // Réduit la largeur quand collapsé
          minHeight: "130vh", // Hauteur minimale de 100vh pour la flexibilité
          height: "auto", // Hauteur automatique pour s'adapter au contenu
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 5px !important", // Réduit le padding pour les icônes seules
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
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "5px 0 10px 0",
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
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/images.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center" mt={1}>
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
            {userRole === "responsable_rh" && (
              <>
                <Item
                  title="Global"
                  to="/DashboardGlobal"
                  icon={<TrendingUpIcon />}
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
              </>
            )}
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
