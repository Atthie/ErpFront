import React, { useState, useEffect } from "react";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import {useLocation } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import routes from "../../routes/routesEm";
import Sidenav from "examples/Sidenav";
import Modal from "react-modal";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Popup from "layouts/Popup4/Popup";
import DeleteIcon from '@mui/icons-material/Delete';
import "./demande_cotation.css";

function Demande_Cotation() {
  const [demandeCotations, setDemandeCotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [demandeCotationId, setDemandeCotationId] = useState("");
  const [demandeCotationNom, setDemandeCotationNom] = useState("");
  const [demandeCotationDescription, setDemandeCotationDescription] = useState("");
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteDemandeCotationId, setDeleteDemandeCotationId] = useState("");
  const [demandeCotationDate, setDemandeCotationDate] = useState("");
  const [demandeCotationDateLimite, setDemandeCotationDateLimite] = useState("");
  const [demandeCotationDuree, setDemandeCotationDuree] = useState("");
  const [demandeCotationEtat, setDemandeCotationEtat] = useState("");
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [selectedDemandeCotation, setSelectedDemandeCotation] = useState(null);

  useEffect(() => {
    fetchDemandeCotations();
  }, []);

  const fetchDemandeCotations = async () => {
    try {
      const response = await axios.get("http://localhost:4000/demandeCotations");
      setDemandeCotations(response.data.demandeCotations);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la récupération des demandes de cotations.");
      setLoading(false);
    }
  };

  const getDemandeCotationData = () => {
    if (!demandeCotations) {
      return { columns: [], rows: [] };
    }

    const demandeCotationColumns = [
      { Header: "N°", accessor: "N°", width: "5%" },
      { Header: "Nom", accessor: "nom", width: "15%" },
      { Header: "Description", accessor: "description", width: "20%" },
      { Header: "Date", accessor: "date", width: "10%" },
      { Header: "Date Limite", accessor: "date_limite", width: "10%" },
      { Header: "Durée", accessor: "duree", width: "12%" },
      { Header: "Etat", accessor: "etat", width: "12%" },
      { Header: "Action", accessor: "action", width: "12%" },
    ];

    const demandeCotationRows = demandeCotations.map((demandeCotation, index) => {
      const truncatedDescription = demandeCotation.description.split(' ').slice(0, 3).join(' ') + '...';
      return {
        "N°": index + 1,
        nom: demandeCotation.nom,
        description: truncatedDescription,
        fullDescription: demandeCotation.description,
        date: demandeCotation.createdAt.split('T')[0],
        date_limite: demandeCotation.dateFin.split('T')[0],
        duree: demandeCotation.duree,
        etat: demandeCotation.etat,
        action: (
          <div className="vn">
            <div>
              <MDButton
                variant="gradient"
                color="info"
                size="small"
                onClick={() => handleEditClick(demandeCotation.id, demandeCotation.nom, demandeCotation.description, demandeCotation.createdAt, demandeCotation.dateFin, demandeCotation.duree, demandeCotation.etat)}
              >
                <EditIcon />
              </MDButton>
            </div>
            <div className="ii">
              <MDButton variant="gradient" color="info" size="small" onClick={() => handlePopupOpen(demandeCotation.id)}>
                <VisibilityIcon />
              </MDButton>
            </div>
          </div>
        ),
      };
    });

    return { columns: demandeCotationColumns, rows: demandeCotationRows };
  };

  const { columns, rows } = getDemandeCotationData();

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

  const handleEditClick = (id, nom, description, date, date_limite, duree, etat) => {
    setDemandeCotationId(id);
    setDemandeCotationNom(nom);
    setDemandeCotationDescription(description);
    setDemandeCotationDate(date);
    setDemandeCotationDateLimite(date_limite);
    setDemandeCotationDuree(duree);
    setDemandeCotationEtat(etat);
    setModalIsOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/demandeCotations/${demandeCotationId}`, { 
        nom: demandeCotationNom,
        description: demandeCotationDescription,
        date: demandeCotationDate,
        date_limite: demandeCotationDateLimite,
        duree: demandeCotationDuree,
        etat: demandeCotationEtat,
      });

      if (response.status === 200) {
        toast.success("Demande de cotation modifiée avec succès.");
        fetchDemandeCotations();
        setModalIsOpen(false);
      } else {
        toast.error("Une erreur est survenue lors de la modification de la demande de cotation.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la modification de la demande de cotation.");
    }
  };

  const handleCancelEdit = () => {
    setModalIsOpen(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteDemandeCotationId(id);
    setDeleteModalIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/demandeCotations/${deleteDemandeCotationId}`);
      toast.success("Demande de cotation supprimée avec succès.");
      fetchDemandeCotations();
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la suppression de la demande de cotation.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalIsOpen(false);
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

  const handleConfirmDeleteAndCloseModal = async () => {
    await handleConfirmDelete();
    handlePopupClose();
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
      <Popup/>

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

              <div className="ii">
                <MDButton variant="gradient" color="info" size="small" onClick={() => handleDeleteClick(selectedDemandeCotation.id)}>
                  <DeleteIcon />
                </MDButton>
              </div>
            </div>
          </>
        </Modal>
      )}
      <MDBox className="tt" py={3}>
        <MDTypography variant="h3">Demandes de Cotation</MDTypography>
      </MDBox>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <DataTable
          py={9}
          table={{
            columns: columns,
            rows: rows,
          }}
        />
      )}
      <ToastContainer />
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCancelEdit}
          contentLabel="Modifier la demande de cotation"
          className="modal"
          overlayClassName="overlay"
        >
          <h2 className="ModalTitle">Modifier la demande de cotation</h2>
          <form>
            <label className="label">Nom :</label>
            <input
              type="text"
              value={demandeCotationNom}
              onChange={(e) => setDemandeCotationNom(e.target.value)}
              className="input"
            />
            <label className="label">Description :</label>
            <input
              type="text"
              value={demandeCotationDescription}
              onChange={(e) => setDemandeCotationDescription(e.target.value)}
              className="input"
            />
            <label className="label">Date :</label>
            <input
              type="date"
              value={demandeCotationDate}
              onChange={(e) => setDemandeCotationDate(e.target.value)}
              className="input"
            />
            <label className="label">Date Limite :</label>
            <input
              type="date"
              value={demandeCotationDateLimite}
              onChange={(e) => setDemandeCotationDateLimite(e.target.value)}
              className="input"
            />
            <label className="label">Durée :</label>
            <input
              type="text"
              value={demandeCotationDuree}
              onChange={(e) => setDemandeCotationDuree(e.target.value)}
              className="input"
            />
            <label className="label">Etat :</label>
            <input
              type="text"
              value={demandeCotationEtat}
              onChange={(e) => setDemandeCotationEtat(e.target.value)}
              className="input"
            />
            <div className="button-container">
              <button type="button" onClick={handleConfirmEdit} className="confirm-button">
                Confirmer
              </button>
              <button type="button" onClick={handleCancelEdit} className="cancel-button">
                Annuler
              </button>
            </div>
          </form>
        </Modal>
      )}
      {deleteModalIsOpen && (
        <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={handleCancelDelete}
          contentLabel="Supprimer la demande de cotation"
          className="modal"
          overlayClassName="overlay"
        >
          <h2 className="ModalTitle">Supprimer la demande de cotation</h2>
          <p>Êtes-vous sûr de vouloir supprimer cette demande de cotation ?</p>
          <div className="button-container">
            <button type="button" onClick={handleConfirmDeleteAndCloseModal} className="confirm-button">
              Confirmer
            </button>
            <button type="button" onClick={handleCancelDelete} className="cancel-button">
              Annuler
            </button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
export default Demande_Cotation;
