import { useState, useEffect} from "react";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import routes from "../../routes/routesAdmin";
import Sidenav from "examples/Sidenav";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Popup from "layouts/Popup/Popup";
import "../../App.css"




function Users() {

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
    const [controller, dispatch] = useMaterialUIController();
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    const [onMouseEnter, setOnMouseEnter] = useState(true);
    const { pathname } = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const {
      miniSidenav,
      layout,
      openConfigurator,
      sidenavColor,
      transparentSidenav,
      whiteSidenav,
      darkMode,
    } = controller;
  
    const handleOnMouseEnter = () => {
      if (miniSidenav && !onMouseEnter) {
        setMiniSidenav(dispatch, false);
        setOnMouseEnter(true);
      }
    };
  
    const handleOnMouseLeave = () => {
      if (onMouseEnter) {
        setMiniSidenav(dispatch, true);
        setOnMouseEnter(false);
      }
    };


  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <Sidenav
        color={sidenavColor}
        brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
        brandName="Material Dashboard 2"
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />

     <DashboardNavbar />
      <MDBox  py={3}>
                <MDTypography variant="h3">Gestion des Utilisateurs</MDTypography>

        </MDBox>
      <DataTable py={9}
  table={{
    columns: [
      { Header: "Date", accessor: "startDate", width: "25%" },
      { Header: "Reference", accessor: "reference", width: "30%" },
      { Header: "Vendeur", accessor: "vendeur" },
      { Header: "Etat", accessor: "etat", width: "12%" },
      { Header: "Action", accessor: "action", width: "12%" },

    ],
    rows: [
      {
        reference: "DMO01",
        vendeur: "Baorixile",
        etat: "En Attente",
        action:  (
          <div className="vn">
            <div>
              <MDButton variant="gradient" color="info" size="small">
                Repondre
              </MDButton>
            </div>
            
          </div>
        ),
        startDate: "4/11/2021",
      },
          ]
  }}
/>
    </DashboardLayout>
  );
}

export default Users;
