import { useState, useEffect} from "react";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from 'axios'


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import routes from "../../routes/routesVendeur";
import Sidenav from "examples/Sidenav";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Popupproduction from "layouts/PopupProduction/Popup";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




function Production() {

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
    const [tableData, setTableData] = useState([]);

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

  useEffect(() => {
    axios.get('http://localhost:5000/Production')
      .then(response => {
        setTableData(response.data); // Mettez à jour l'état avec les données récupérées depuis l'API
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données de l\'API', error);
      });
  }, []);
  
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
      <Popupproduction/>
      <div className="cont234">
                    <MDBox py={3}>
                    
                            <MDTypography variant="h3">Production</MDTypography>

                    </MDBox>
                  <DataTable py={9}
              table={{
                columns: [
                  { Header: "Produit", accessor: "nom", width: "15%" },
                  { Header: "Ressource", accessor: "ressource", width: "20%" },
                  { Header: "Etat", accessor: "etat", width: "12%" },
                  { Header: "coût", accessor: "cout", width: "12%" },
                  { Header: "Délai", accessor: "delai", width: "12%" },
                  { Header: "Action", accessor: "action", width: "12%" },

                ],
                rows: tableData.map(item => ({
                  nom: item.nom,
                  ressource: item.ressource,
                  vendeur: item.vendeur,
                  etat: item.etat,
                  delai:item.delai,
                  cout:item.cout,
                  action: <div className="vn">
                    <div>
                      <MDButton variant="gradient" color="info" size="small">
                        <EditIcon />
                      </MDButton>
                    </div>
                    <div className="ii">
                      <MDButton variant="gradient" color="primary" size="small">
                        <DeleteIcon />
                      </MDButton>
                    </div>
                  </div>,

                
                  startDate: item.startDate,
                })),
                
              }}
            />
      </div>
      
    </DashboardLayout>
  );
}

export default Production;
