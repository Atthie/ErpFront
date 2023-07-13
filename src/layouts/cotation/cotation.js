import { useState, useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import routes from "../../routes/routesVendeur";
import Sidenav from "examples/Sidenav";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Popup from "layouts/Popup/Popup";
import "../../App.css";

import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cotation() {
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

  const [demandesCotation, setDemandesCotation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getdemandeCotationde");
        setDemandesCotation(response.data);
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des demandes de cotation.");
      }
    };

    fetchData();
  }, []);

  const demandeCotationColumns = [
    { Header: "N°", accessor: "N°", width: "5%" },
    { Header: "Nom de l'Entreprise", accessor: "nom", width: "15%" },
    { Header: "Description", accessor: "description", width: "30%" },
    { Header: "Statut", accessor: "statut", width: "10%" },
    { Header: "Etat", accessor: "etat", width: "12%" },
    { Header: "DateFin", accessor: "endDate", width: "15%" },
    { Header: "Action", accessor: "action", width: "12%" },
  ];

  const demandeCotationRows = demandesCotation.map((demande) => ({
    "N°": demande.reference,
    nom: demande.vendeur,
    description: demande.description,
    statut: demande.repondu ? "Ancienne" : "Nouvelle",
    etat: demande.etat,
    action: (
      <div className="vn">
        <div>
          <MDButton variant="gradient" color="info" size="small" onClick={() => handleOpenModal(demande)}>
            Repondre
          </MDButton>
        </div>
      </div>
    ),
    endDate: demande.startDate,
  }));

  const handleOpenModal = (demande) => {
    setSelectedDemande(demande);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDemande(null);
    setIsModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    // Envoyer la réponse de la facture à l'API
    const { nomduvendeur,entreprise, description, articles } = data;

    // Calculer les totaux
    const totalHT = articles.reduce((total, article) => total + article.quantite * article.prixUnitaire, 0);
    const taxes = totalHT * 0.2;
    const totalTTC = totalHT + taxes;

    // Envoyer les données à l'API
    const formData = {
      nomduvendeur,
      entreprise,
      description,
      articles,
      totalHT,
      taxes,
      totalTTC,
    };

    axios.post("http://localhost:4000/createFacture", formData)
      .then((response) => {
        toast.success("La facture a été créée avec succès !");
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Une erreur est survenue lors de la création de la facture.", error);
        toast.error("Une erreur est survenue lors de la création de la facture.");
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
        <MDTypography variant="h3">Cotation</MDTypography>
      </MDBox>

      <DataTable
        py={9}
        table={{
          columns: demandeCotationColumns,
          rows: demandeCotationRows,
        }}
      />

       <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Répondre à la demande de cotation"
        className="modal"
       >
         <form onSubmit={handleSubmit(handleFormSubmit)}>
           <h2>Répondre à la demande de cotation</h2>
       
           <div className="form-group">
             <label htmlFor="nomVendeur">Nom du vendeur</label>
             <input
               type="text"
               className={`form-control ${errors.nomVendeur ? "is-invalid" : ""}`}
               id="nomVendeur"
               {...register("nomVendeur", { required: true })}
             />
             {errors.nomVendeur && <div className="invalid-feedback">Ce champ est requis.</div>}
           </div>
       
           <div className="form-group">
             <label htmlFor="entreprise">Entreprise</label>
             <input
               type="text"
               className={`form-control ${errors.entreprise ? "is-invalid" : ""}`}
               id="entreprise"
               {...register("entreprise", { required: true })}
             />
             {errors.entreprise && <div className="invalid-feedback">Ce champ est requis.</div>}
           </div>
       
           <div className="form-group">
             <label htmlFor="description">Description</label>
             <textarea
               className={`form-control ${errors.description ? "is-invalid" : ""}`}
               id="description"
               {...register("description", { required: true })}
             ></textarea>
             {errors.description && <div className="invalid-feedback">Ce champ est requis.</div>}
           </div>
       
           <div className="form-group">
             <label htmlFor="articles">Articles</label>
             <input
               type="text"
               className={`form-control ${errors.articles ? "is-invalid" : ""}`}
               id="articles"
               {...register("articles", { required: true })}
             />
             {errors.articles && <div className="invalid-feedback">Ce champ est requis.</div>}
           </div>
       
           <div className="form-group">
             <label htmlFor="totalHT">Total HT</label>
             <input
               type="number"
               className={`form-control ${errors.totalHT ? "is-invalid" : ""}`}
               id="totalHT"
               {...register("totalHT", { required: true })}
             />
             {errors.totalHT && <div className="invalid-feedback">Ce champ est requis.</div>}
           </div>
       
           <div className="form-group">
             <label htmlFor="taxes">Taxes</label>
             <input
               type="number"
               className={`form-control ${errors.taxes ? "is-invalid" : ""}`}
               id="taxes"
               {...register("taxes", { required: true })}
             />
             {errors.taxes && <div className="invalid-feedback">Ce champ est requis.</div>}
           </div>
       
           <div className="form-group">
             <label htmlFor="totalTTC">Total TTC</label>
             <input
               type="number"
               className={`form-control ${errors.totalTTC ? "is-invalid" : ""}`}
               id="totalTTC"
               {...register("totalTTC", { required: true })}
             />
             {errors.totalTTC && <div className="invalid-feedback">Ce champ est requis.</div>}
           </div>
       
           <div className="form-group">
             <button type="submit" className="btn btn-primary">
               Envoyer
             </button>
             <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
               Annuler
             </button>
           </div>
         </form>
     </Modal>
       
       
    <ToastContainer />
    </DashboardLayout>
  );
}

export default Cotation;
