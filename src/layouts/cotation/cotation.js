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
import VisibilityIcon from '@mui/icons-material/Visibility';
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
import "./cotation.css";

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

  const [demandeCotations, setDemandeCotations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemandeCotation, setSelectedDemandeCotation] = useState(null);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/demandeCotations");
        setDemandeCotations(response.data.demandeCotations);
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des demandes de cotations.");
        toast.error("Une erreur est survenue lors de la récupération des demandes de cotations.");
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
    { Header: "Date_limite", accessor: "dateFin", width: "15%" },
    { Header: "Action", accessor: "action", width: "12%" },
  ];

  const demandeCotationRows = demandeCotations.map((demandeCotation, index) => {
    const truncatedDescription = demandeCotation.description.split(' ').slice(0, 3).join(' ') + '...';
    return {
     "N°": index + 1,
     nom: demandeCotation.nom,
     description: truncatedDescription,
     statut: demandeCotation.repondu ? "Ancienne" : "Nouvelle",
     etat: demandeCotation.etat,
     dateFin: demandeCotation.dateFin.split('T')[0],
     action: (
       <div className="vn">
         <div>
           <MDButton variant="gradient" color="info" size="small" onClick={() => handleOpenModal(demandeCotation)}>
             Repondre
           </MDButton>
          </div> 
          <div className="ii">
            <MDButton variant="gradient" color="info" size="small" onClick={() => handlePopupOpen(demandeCotation.id)}>
              <VisibilityIcon />
            </MDButton>
          </div>
         
       </div>
     ),
    }
  });

  const handleOpenModal = (demandeCotation) => {
    setSelectedDemandeCotation(demandeCotation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDemandeCotation(null);
    setIsModalOpen(false);
    reset(); // Réinitialiser le formulaire lorsque le modal est fermé
  };
  const handlePopupOpen = (demandeCotationId) => {
    const selectedCotation = demandeCotations.find(cotation => cotation.id === demandeCotationId);
    if (selectedCotation) {
      setSelectedDemandeCotation(selectedCotation);
      setPopupIsOpen(true);
    }
  };

  const handlePopupClose = () => {
    setSelectedDemandeCotation(null);
    setPopupIsOpen(false);
  };

  const handleFormSubmit = (data) => {
    // Vérifier si tous les champs sont remplis
    if (!data.nomVendeur || !data.entreprise || !data.description || !data.articles || !data.totalHT || !data.taxes || !data.totalTTC) {
      toast.error("Tous les champs sont requis.");
      return;
    }

    // Envoyer la réponse de la facture à l'API
    const { nomVendeur, entreprise, description, articles, totalHT, taxes, totalTTC } = data;

    // Envoyer les données à l'API
    const formData = {
      nomduvendeur: nomVendeur,
      entreprise,
      description,
      articles,
      totalHT,
      taxes,
      totalTTC,
    };

    axios
      .post("http://localhost:4000/createFacture", formData)
      .then((response) => {
        toast.success("La facture a été créée avec succès !");
        setIsModalOpen(false);
        reset(); // Réinitialiser le formulaire après la soumission réussie
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
       {popupIsOpen && selectedDemandeCotation && (
        <Modal
          isOpen={popupIsOpen}
          onRequestClose={handlePopupClose}
          contentLabel="Détails de la demande de cotation"
          className="modal"
          overlayClassName="overlay"
        >
          <>
            <h2 className="ModalTitle">Détails de la demande de cotation</h2>
            <div>
             <label htmlFor="nom">Nom :</label>
             <input
               type="text"
               id="nom"
               value={selectedDemandeCotation.nom}
               className="input"
               readOnly
             />
             
             <label htmlFor="description">Description :</label>
             <textarea
               type="text"
               id="description"
               value={selectedDemandeCotation.description}
               className="TextaeaField1"
               readOnly
             />
             
             <label htmlFor="date">Date :</label>
             <input
               type="text"
               id="date"
               value={selectedDemandeCotation.date}
               className="input"
               readOnly
             />
             
             <label htmlFor="date_limite">Date Limite :</label>
             <input
               type="text"
               id="date_limite"
               value={selectedDemandeCotation.date_limite}
               className="input"
               readOnly
             />
             
             <label htmlFor="duree">Durée :</label>
             <input
               type="text"
               id="duree"
               value={selectedDemandeCotation.duree}
               className="input"
               readOnly
             />
             
             <label htmlFor="etat">Etat :</label>
             <input
               type="text"
               id="etat"
               value={selectedDemandeCotation.etat}
               className="input"
               readOnly
             />
            </div>
          </>
        </Modal>
      )}
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
          <h2 className="ModalTitle">Répondre à la demande de cotation</h2>

          <div className="form-group">
            <label className="label">Nom du vendeur</label>
            <input
              type="text"
              className={`input ${errors.nomVendeur ? "is-invalid" : ""}`}
              id="nomVendeur"
              {...register("nomVendeur", { required: true })}
            />
            {errors.nomVendeur && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          <div className="form-group">
            <label className="label">Entreprise</label>
            <input
              type="text"
              className={`input ${errors.entreprise ? "is-invalid" : ""}`}
              id="entreprise"
              {...register("entreprise", { required: true })}
            />
            {errors.entreprise && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          <div className="form-group">
            <label className="label">Description</label>
            <textarea
              className={`input ${errors.description ? "is-invalid" : ""}`}
              id="description"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          <div className="form-group">
            <label className="label">Articles</label>
            <input
              type="text"
              className={`input ${errors.articles ? "is-invalid" : ""}`}
              id="articles"
              {...register("articles", { required: true })}
            />
            {errors.articles && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          <div className="form-group">
            <label className="label">Total HT</label>
            <input
              type="number"
              className={`input ${errors.totalHT ? "is-invalid" : ""}`}
              id="totalHT"
              {...register("totalHT", { required: true })}
            />
            {errors.totalHT && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          <div className="form-group">
            <label className="label">Taxes</label>
            <input
              type="number"
              className={`input ${errors.taxes ? "is-invalid" : ""}`}
              id="taxes"
              {...register("taxes", { required: true })}
            />
            {errors.taxes && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          <div className="form-group">
            <label className="label">Total TTC</label>
            <input
              type="number"
              className={`input ${errors.totalTTC ? "is-invalid" : ""}`}
              id="totalTTC"
              {...register("totalTTC", { required: true })}
            />
            {errors.totalTTC && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          <div className="button-container">
            <button type="submit" className="confirm-button">
             Envoyer
            </button>
            <button type="button" className="cancel-button" onClick={handleCloseModal}>
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
