
import { useState, useEffect} from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";

import Sidenav from "examples/Sidenav";

import routes from "../../routes/routesVendeur";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Grid from "@mui/material/Grid";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard_EM/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard_EM/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard_EM/components/Projects";
import OrdersOverview from "layouts/dashboard_EM/components/OrdersOverview";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import "../../App.css"

function Dashboard_Vendeur() {
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
                        icon="receipt_long"
                        title="Offres"
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
                        color="success"
                        icon="shopping_bag"
                        title="Stocks"
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
                        icon="shopping_cart"
                        title="Commandes"
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
                        icon="groups_2"
                        title="Clients"
                        count="34k"
                        percentage={{
                          color: "success",
                        
                        }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </div>

              <h2 className="zr">Démande des Cotations Recents</h2>
              <div className="ligne"></div>

              <div className="se">
                  <MDBox mt={4.5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDBox mb={3}>
                            <DefaultInfoCard
                                icon="account_balance"
                                title="TFM"
                                description="Belong Interactive"
                                value="+$2000"
                          />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDBox mb={3}>
                      <DefaultInfoCard
                                icon="account_balance"
                                title="KAMOA"
                                description="Belong Interactive"
                                value="+$2000"
                          />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDBox mb={3}>
                      <DefaultInfoCard
                                icon="account_balance"
                                title="Rwashi_Mining"
                                description="Belong Interactive"
                                value="+$2000"
                          />
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </div>
              <div className="se">
                  <MDBox mt={4.5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDBox mb={3}>
                            <DefaultInfoCard
                                icon="account_balance"
                                title="CHEMAF"
                                description="Belong Interactive"
                                value="+$2000"
                          />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDBox mb={3}>
                      <DefaultInfoCard
                                icon="account_balance"
                                title="KICCO MINING"
                                description="Belong Interactive"
                                value="+$2000"
                          />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <MDBox mb={3}>
                      <DefaultInfoCard
                                icon="account_balance"
                                title="KIBALI COLD"
                                description="Belong Interactive"
                                value="+$2000"
                          />
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </div>
              
              
              <MDBox>
              
              </MDBox>
            </MDBox>


      </div>
    </DashboardLayout>
  );
}

export default Dashboard_Vendeur;
