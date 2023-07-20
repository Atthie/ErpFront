import { useState, useEffect} from "react";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
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

import routes from "../../routes/routesVendeur";
import Sidenav from "examples/Sidenav";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Popup from "layouts/Popup/Popup";
import "../../App.css"
import PopupComptabilite from "layouts/Popup copy/Popup";




function Comptabilite() {

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
    const [tablecomptReq, setTablecomptReq] = useState([]);
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
    axios.get('http://localhost:5000/montant')
      .then(response => {
        setTablecomptReq(response.data); // Mettez à jour l'état avec les données récupérées depuis l'API
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

      <PopupComptabilite/>

      <div className="compte">
            <MDBox ClassName="tt" py={3}>
                    <MDTypography variant="h3">Comptabilité</MDTypography>

            </MDBox>
          <DataTable py={9}
      table={{
        columns: [
          { Header: "Date", accessor: "startDate", width: "25%" },
          { Header: "montant", accessor: "montant", width: "30%" },
          { Header: "description", accessor: "description" },
          { Header: "transaction", accessor: "transaction", width: "12%" },
          { Header: "Action", accessor: "action", width: "12%" },

        ],
        rows:tablecomptReq.map(item =>({ 
          montant: item.montant,
          description: item.description,
          transaction: item.transaction,
          
          action:  
              <div className="vn">
                <div>
                  <MDButton variant="gradient" color="info" size="small">
                    <EditIcon />
                  </MDButton>
                </div>
                
                <div className="ii">
                  <MDButton variant="gradient" color="info" size="small">
                    <DeleteIcon />
                  </MDButton>
                </div>
                
              </div>
            ,
            startDate: "4/11/2021",

        })),
           
            }}
          />
      </div>
      
    </DashboardLayout>
  );
}

export default Comptabilite;
