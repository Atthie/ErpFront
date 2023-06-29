
import { useState, useEffect} from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";

import Sidenav from "examples/Sidenav";

import routes from "../../routes/routesAdmin";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Grid from "@mui/material/Grid";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Popup2 from "layouts/Popup2/Popup2";
import ReportsChart from "layouts/state/state";

// Data
import reportsLineChartData from "layouts/dashboard_EM/data/reportsLineChartData";


import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";


import "../../App.css"

function Dashboard_Admin() {
  const { sales, tasks } = reportsLineChartData;
  const [controller, dispatch] = useMaterialUIController();

  
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

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);


  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

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

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Material Dashboard 2"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
      <div className="cont">
            <MDBox py={3}>
              <div className="cont-form1">
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                      <ComplexStatisticsCard
                        color="dark"
                        icon="shopping_bag"
                        title="Articles"
                        count={281}
                        percentage={{
                          color: "success",
                          
                        }}
                      />
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                      <ComplexStatisticsCard
                        color="primary"
                        icon="groups_2"
                        title="Vendeurs"
                        count={281}
                        percentage={{
                          color: "success",
                          
                        }}
                      />
                    </MDBox>
                  </Grid>



                  <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                      <ComplexStatisticsCard
                        icon="business"
                        title="Emtreprises"
                        count="2,300"
                        percentage={{
                          color: "Primary",
                        
                        }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                      <ComplexStatisticsCard
                        color="success"
                        icon="attribution"
                        title="Gestion des Utilisateurs"
                        count="34k"
                        percentage={{
                          color: "success",
                        
                        }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </div>
              <ReportsChart/>
              

             

              
              
              
              <MDBox>
              
              </MDBox>
            </MDBox>


      </div>
    </DashboardLayout>
  );
}

export default Dashboard_Admin;
