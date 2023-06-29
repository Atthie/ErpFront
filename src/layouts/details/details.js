import { useState, useEffect } from "react";
import axios from "axios";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { Route, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from 'react-avatar';
import Modal from "react-modal";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import { Task } from "@mui/icons-material";

import Notes from "layouts/note/note";


import routes from "../../routes/routesEm";
import Sidenav from "examples/Sidenav";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import reportsLineChartData from "layouts/dashboard_Admin/data/reportsLineChartData";
import "./stocks.css";
import "../../App.css"

Modal.setAppElement("#root");

function Details() {
  const { sales, tasks } = reportsLineChartData;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [articleId, setArticleId] = useState("");
  const [articleNom, setArticleNom] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleQuantite, setArticleQuantite] = useState("");
  const [articlePhoto, setArticlePhoto] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteArticleId, setDeleteArticleId] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/articles");
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la récupération des articles.");
      setLoading(false);
    }
  };

  const getArticleData = () => {
    const articleColumns = [
      { Header: "N°", accessor: "N°", width: "5%" },
      { Header: "Photo", accessor: "photo", width: "8%" },
      { Header: "Nom", accessor: "nom", width: "15%" },
      { Header: "Description", accessor: "description", width: "20%" },
      { Header: "Quantité", accessor: "quantite", width: "12%" },
      { Header: "Statut", accessor: "statut", width: "12%" },
      { Header: "Date", accessor: "createdAt", width: "12%" },
      { Header: "Action", accessor: "action", width: "12%" },
    ];

    const articleRows = articles.map((article, index) => {
      const statut = article.quantite >= 10 ? "Disponible" : "Non disponible";
      const photo = article.photo ? (
        <img src={article.photo} alt={article.nom} style={{ width: "100%" }} />
      ) : (
        <Avatar name={article.nom} size={40} round={true} />
      );

      return {
        "N°": index + 1,
        photo: photo,
        nom: article.nom,
        description: article.description,
        quantite: article.quantite,
        statut: statut,
        createdAt: new Date(article.createdAt).toLocaleString("fr-FR"),
        action: (
          <div className="vn">
            <div>
              <MDButton
                variant="gradient"
                color="info"
                size="small"
                onClick={() => handleEditClick(article.id, article.nom, article.description, article.quantite, article.photo)}
              >
                <EditIcon />
              </MDButton>
            </div>
            <div className="ii">
              <MDButton variant="gradient" color="info" size="small" onClick={() => handleDeleteClick(article.id)}>
                <DeleteIcon />
              </MDButton>
            </div>
          </div>
        ),
      };
    });

    return { columns: articleColumns, rows: articleRows };
  };

  const { columns, rows } = getArticleData();

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

  const handleEditClick = (id, nom, description, quantite, photo) => {
    setArticleId(id);
    setArticleNom(nom);
    setArticleDescription(description);
    setArticleQuantite(quantite);
    setArticlePhoto(photo);
    setModalIsOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/articles/${articleId}`, {
        nom: articleNom,
        description: articleDescription,
        quantite: articleQuantite,
        photo: articlePhoto,
      });

      if (response.status === 200) {
        toast.success("Article modifié avec succès.");
        fetchArticles();
        setModalIsOpen(false);
      } else {
        toast.error("Une erreur est survenue lors de la modification de l'article.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la modification de l'article.");
    }
  };

  const handleCancelEdit = () => {
    setModalIsOpen(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteArticleId(id);
    setDeleteModalIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/articles/${deleteArticleId}`);
      toast.success("Article supprimé avec succès.");
      fetchArticles();
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la suppression de l'article.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalIsOpen(false);
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
      <div>

        <div className="vnCont">
          <div className="bx">
            <img className="logoVend" src="Gcm.jpg"/>
            <div className="WX">
              <h2>Rwashi_Mining</h2> 
              <h4>Lubumbashi</h4>
              <h6>Description</h6>
            </div>
          </div>
        </div>

        <Grid item xs={12} md={6} lg={3}>
          
        </Grid>

        <div className="lm">
       
          <Grid item xs={12} md={6} lg={4}>
              <MDBox className="graph" mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Ventes"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <MDBox className="graph" mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox className="graph" mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
        </div>

       <div>
        <h4>Notés</h4>
        <Notes/>
       </div>
        

      </div>
     
      </DashboardLayout>
  );
}

export default Details;
