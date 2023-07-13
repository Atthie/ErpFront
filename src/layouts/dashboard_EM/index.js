
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
import "../../App.css"

import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const ajouterArticle = () => {
    const data = {
      dateFin: selectedDate,
      description: descriptionValue,
      userId: idUser,
      etat: "Brouillon"
    };
  
    axios.post("http://localhost:5000/demandeCotation", data)
      .then(response => {
        const nouvelArticleId = response.data.id; // Récupérez l'ID de l'article créé depuis la réponse de l'API
  
        axios.get(`http://localhost:5000/getlastdemandeCotation/${nouvelArticleId}`)
          .then(response => {
            const nouvelDM = response.data; // Récupérez l'élément de l'article créé
            navigate(`/article_cotation/${nouvelDM.id}`);
          })
          .catch(error => {
            console.error(error);
            alert("Une erreur s'est produite lors de la récupération de l'article.");
          });
      })
      .catch(error => {
        console.error(error);
        alert("Une erreur s'est produite lors de l'ajout de l'article.");
      });
  };
  

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
            navigate(`/demande_cotation`);

          })
          .catch(error => {
            console.error(error);
            alert("Une erreur s'est produite lors de la publication de l'offre.");
          });
      } else if (result.isDenied) {
        const data = {
          dateFin: selectedDate,
          description: descriptionValue,
          userId: idUser,
          etat:'Brouillon'
        };
        console.log(data)
        axios.post("http://localhost:5000/demandeCotation", data)
          .then(response => {
            Swal.fire('Brouillon enregistré!', '', 'success');
            navigate(`/demande_cotation`);

          })
          .catch(error => {
            console.error(error);
            alert("Une erreur s'est produite lors de la publication de l'offre.");
          });      }
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
                  icon="assignment"
                  title="Demande de Cotation"
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
                  icon="local_mall"
                  title="Commandes"
                  count="2,300"
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
                  icon="receipt_long"
                  title="Offres"
                  count="34k"
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
                  count="+91"
                  percentage={{
                    color: "success",
                    
                  }}
                />
              </MDBox>
            </Grid>
        </Grid>
        
      </MDBox>
      
    </DashboardLayout>
  );
}

export default Dashboard_EM;
