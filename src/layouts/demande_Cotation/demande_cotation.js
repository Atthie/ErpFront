import { useState, useEffect} from "react";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from 'axios';
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

import routes from "../../routes/routesEm";
import Sidenav from "examples/Sidenav";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import Swal from 'sweetalert2';



function Demande_Cotation() {

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
  const [cotations, setCotations] = useState([]);
  useEffect(() => {
    const fetchCotations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getdemandeCotation');
        setCotations(response.data);
      } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des cotations :', error);
      }
    };

    fetchCotations();
  }, []);


  const handleDelete = (id) => {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette demande de cotation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/deleteDM/${id}`)
          .then((response) => {
            Swal.fire('Suppression réussie', 'La demande de cotation a été supprimée.', 'success');
            setCotations(cotations.filter((cotation) => cotation.id !== id));
          })
          .catch((error) => {
            console.error('Une erreur est survenue lors de la suppression de la demande de cotation :', error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de la demande de cotation.', 'error');
          });
      }
    });
  };
  





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
        <MDBox py={3}>
          <MDTypography variant="h3">Demande de Cotation</MDTypography>
        </MDBox>
      <DataTable py={9}
  table={{
    columns: [
      { Header: "Date", accessor: "date", width: "25%" },
      { Header: "Description", accessor: "description", width: "30%" },
      { Header: "Date Limite", accessor: "date_limite" },
      { Header: "Etat", accessor: "etat", width: "12%" },
      { Header: "Action", accessor: "action", width: "12%" },
    ],
    rows: cotations.map((cotation) => ({
      date: cotation.createdAt,
      description: cotation.description,
      date_limite: cotation.dateFin,
      etat: cotation.etat,
      action: (
        <>
          {cotation.etat !== 'publié' && (
            <>
              <MDButton variant="gradient" color="info" size="small">
                <EditIcon fontSize={"large"} />
              </MDButton>
              <span style={{ marginRight: '10px' }}></span>
              <MDButton
                  variant="gradient"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(cotation.id)}
                >
                <DeleteIcon />
              </MDButton>
            </>
          )}
        </>
      )    }))
  }}
/>
    </DashboardLayout>
  );
}

export default Demande_Cotation;
