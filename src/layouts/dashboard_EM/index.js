
import { useState, useEffect, useContext} from "react";


import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import {AppContext} from "context/idUser"

import routes from "../../routes/routesEm";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Swal from 'sweetalert2';

// ...


import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Grid from "@mui/material/Grid";

import Sidenav from "examples/Sidenav";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
 
import axios from "axios"
import reportsLineChartData from "layouts/dashboard_EM/data/reportsLineChartData";


function Dashboard_EM() {
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
  const today = new Date().toISOString().split("T")[0]; // Obtient la date actuelle au format "yyyy-MM-dd"
  const [selectedDate, setSelectedDate] = useState(today);
  const { idUser, setidUser} = useContext(AppContext);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const [descriptionValue, setDescriptionValue] = useState('');

const handleDescriptionChange = (event) => {
  setDescriptionValue(event.target.value);
};
  const [ajoutArticleVisible, setAjoutArticleVisible] = useState(false);

  const terminer = () => {
    
    Swal.fire({
      title: 'Que voulez-vous faire de cette offre?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Publier',
      denyButtonText: `Brouillon`,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          dateFin: selectedDate,
          description: descriptionValue,
          userId: idUser,
          etat:'publié'
        };
        console.log(data)
        axios.post("http://localhost:5000/demandeCotation", data)
          .then(response => {
            Swal.fire('Offre publiée!', '', 'success');
          })
          .catch(error => {
            console.error(error);
            alert("Une erreur s'est produite lors de la publication de l'offre.");
          });
      } else if (result.isDenied) {
        Swal.fire('Brouillon enregistré', '', 'info');
      }
    });
  };
  
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
      <MDBox py={10}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="business"
                  title="Bookings"
                  count={281}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="order"
                  title="Today's Users"
                  count="2,300"
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "test",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="Revenue"
                  count="34k"
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Followers"
                  count="+91"
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
        </Grid>
        <MDBox py={9}>
                <MDTypography variant="h3">Soumettre une demande d'Offre</MDTypography>

        </MDBox>
        <Grid container  columns={3}  spacing={2}>
                <Grid item xs={12} md={6} lg={3}>          
                  <MDInput type="date" value={selectedDate} onChange={handleDateChange}  label="Date limite"  />        
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                <MDInput label="Description" sx={{ width: "100%" }} onChange={handleDescriptionChange}  multiline rows={8}   />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                <MDInput label="" sx={{ width: "100%",display: "none"  }}  value={idUser}  />
                </Grid>
        </Grid>
        <MDBox mt={2.5}>
      <Grid container justifyContent={"flex-end"}>
        <Grid item md={1.2}>
          <MDButton
            variant="gradient"
            color="info"
            size="large"
            onClick={terminer}
          >
            Terminer
          </MDButton>
        </Grid>
        <Grid item>
            <MDButton
              variant="gradient"
              color="info"
              size="large"
            >
              + Article
            </MDButton>
          
        </Grid>
      </Grid>
    </MDBox>
      </MDBox>
      
    </DashboardLayout>
  );
}

export default Dashboard_EM;
