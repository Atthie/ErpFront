
import { useState, useEffect, useContext, } from "react";


import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import jsPDF from 'jspdf';


import routes from "../../routes/routesEm";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Swal from 'sweetalert2';
import MDButton from "components/MDButton";

import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Grid from "@mui/material/Grid";

import Sidenav from "examples/Sidenav";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
 
import axios from "axios"
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import Header from "layouts/articles/components/Header";
import { useNavigate } from 'react-router-dom';

function Article_Cotation() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [controller, dispatch] = useMaterialUIController();
  const [onMouseEnter, setOnMouseEnter] = useState(true);
  const { pathname } = useLocation();
  const {
    miniSidenav,
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

    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await axios.get('http://localhost:5000/getAllArticles');
          setArticles(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des articles', error);
        }
      };
    
      fetchArticles();
    }, []);
    
    const [isAdded, setIsAdded] = useState("Ajouter");
    useEffect(() => {
      console.log("La valeur de isAdded a changé :", isAdded);
      
    }, [isAdded]);

  const [articles, setArticles] = useState([]);
  const handleAddRemove = async (articleId) => {
    if (isAdded[articleId]) {
      Swal.fire({
        title: 'Ajouter la quantité',
        input: 'number',
        inputLabel: 'Quantité',
        inputAttributes: {
          min: 1,
          type: 'number',
        },
       
        showCancelButton: true,
        confirmButtonText: 'Valider',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("jkkfkdkf")
          const quantity = result.value;
            try {
              const response =  axios.post('http://localhost:5000/addArticleCotation', {
                quantite: quantity,
                dmId: id,
                articleId: articleId,
              });
              console.log(response.data); // Afficher la réponse de l'API en cas de succès
          
              setIsAdded((prevIsAdded) => {
                const updatedIsAdded = { ...prevIsAdded };
                updatedIsAdded[articleId] = !updatedIsAdded[articleId];
                return updatedIsAdded;
              });
            } catch (error) {
              console.error("Erreur lors de l'ajout de l'article", error);
            }
        }
      });   
    } else {
        try {
          const response = await axios.post('http://localhost:5000/deleteArticle', { articleId });
          setIsAdded((prevIsAdded) => {
            const updatedIsAdded = { ...prevIsAdded };
            updatedIsAdded[articleId] = !updatedIsAdded[articleId];
            return updatedIsAdded;
          });
          console.log(isAdded);
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'article", error);
        }
    }
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
        axios.put(`http://localhost:5000/publier/${id}`)
        .then(response => {
          Swal.fire('Offre publiée!', '', 'success');
          navigate(`/demande_cotation`);
        })
        .catch(error => {
          console.log(error);
          Swal.fire('Erreur lors de la publication de l\'offre', '', 'error');
        });
        
      } else if (result.isDenied) {
        
            Swal.fire('Brouillon enregistré!', '', 'success');
            navigate(`/demande_cotation`);
     
        }
    });
  };
  
  
  
  
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav
        color={sidenavColor}
        brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
        brandName=""
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <MDBox mb={2} />
        <Header>
         
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h3" fontWeight="medium">
              Liste d'Articles
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Selectionnez les articles a ajouter sur votre Demande de cotation
            </MDTypography>
            <span style={{ marginRight: '10px' }}></span>
            <MDButton
            variant="gradient"
            color="info"
            size="large"
            onClick={terminer}
          >
           Terminer
          </MDButton>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
        <Grid container spacing={6}>
          {articles.map((article) => (
            <Grid item xs={12} md={6} xl={2} key={article.id}>
              <DefaultProjectCard
                image={article.photo}
                title={article.nom}
                description={article.description}
                action={{
                  type: 'internal',
                  route: '',
                  color: 'info',
                  label: (
                    <MDButton
                     
                      color="info"
                      onClick={() => handleAddRemove(article.id)}
                    >
                      {isAdded[article.id] ? "Ajouter" : "Retirer"}
                    </MDButton>
                  ),
                }}
              />
            </Grid>
          ))}
        </Grid>
        </MDBox>
        </Header>
      
    </DashboardLayout>
  );
}

export default Article_Cotation;
