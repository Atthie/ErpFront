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
import Rating from 'react-rating';

import routes from "../../routes/routesVendeur";
import Sidenav from "examples/Sidenav";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Popup from "layouts/Popup3/Popup";
import "../../App.css";

Modal.setAppElement("#root");

function Portefeuil() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientNom, setClientNom] = useState("");
  const [clientDescription, setClientDescription] = useState("");
  const [clientPhoto, setClientPhoto] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientEntreprise, setClientEntreprise] = useState("");
  const [clientAdresse, setClientAdresse] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:4000/clients");
      setClients(response.data.clients);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la récupération des clients.");
      setLoading(false);
    }
  };

  const getClientData = () => {
    const clientColumns = [
      { Header: "N°", accessor: "N°", width: "5%" },
      { Header: "Photo", accessor: "photo", width: "8%" },
      { Header: "Nom", accessor: "nom", width: "15%" },
      { Header: "Email", accessor: "email", width: "20%" },
      { Header: "Entreprise", accessor: "entreprise", width: "12%" },
      { Header: "Adresse", accessor: "adresse", width: "12%" },
      { Header: "Statut", accessor: "statut", width: "12%" },
      { Header: "Date", accessor: "createdAt", width: "12%" },
      { Header: "Action", accessor: "action", width: "12%" },
    ];

    const clientRows = clients.map((client, index) => {
      const photo = client.photo ? (
        <img src={client.photo} alt={client.nom} style={{ width: "100%" }} />
      ) : (
        <Avatar name={client.nom} size={40} round={true} />
      );

      return {
        "N°": index + 1,
        photo: photo,
        nom: client.nom,
        email: client.email,
        entreprise: client.entreprise,
        adresse: client.adresse,
        statut: (
          <Rating
            emptySymbol="☆"
            fullSymbol="★"
            initialRating={client.rating}
            readonly
          />
        ),
        createdAt: new Date(client.createdAt).toLocaleString("fr-FR"),
        action: (
          <div className="vn">
            <div>
              <MDButton
                variant="gradient"
                color="info"
                size="small"
                onClick={() => handleEditClick(client.id, client.nom, client.description, client.photo, client.email, client.entreprise, client.adresse)}
              >
                <EditIcon />
              </MDButton>
            </div>
            <div className="ii">
              <MDButton variant="gradient" color="info" size="small" onClick={() => handleDeleteClick(client.id)}>
                <DeleteIcon />
              </MDButton>
            </div>
          </div>
        ),
      };
    });
  
    return { columns: clientColumns, rows: clientRows };
  };

  const { columns, rows } = getClientData();

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

  const handleEditClick = (id, nom, description, photo, email, entreprise, adresse) => {
    setClientId(id);
    setClientNom(nom);
    setClientDescription(description);
    setClientPhoto(photo);
    setClientEmail(email);
    setClientEntreprise(entreprise);
    setClientAdresse(adresse);
    setModalIsOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/clients/${clientId}`, {
        nom: clientNom,
        description: clientDescription,
        photo: clientPhoto,
        email: clientEmail,
        entreprise: clientEntreprise,
        adresse: clientAdresse,
      });

      if (response.status === 200) {
        toast.success("Client modifié avec succès.");
        fetchClients();
        setModalIsOpen(false);
      } else {
        toast.error("Une erreur est survenue lors de la modification du client.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la modification du client.");
    }
  };

  const handleCancelEdit = () => {
    setModalIsOpen(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteClientId(id);
    setDeleteModalIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/clients/${deleteClientId}`);
      toast.success("Client supprimé avec succès.");
      fetchClients();
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la suppression du client.");
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
      <Popup />
      <MDBox className="tt" py={3}>
        <MDTypography variant="h3">Gestion de Stocks</MDTypography>
      </MDBox>
      {loading ? (
        <div>Loading...</div>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCancelEdit}
        contentLabel="Modifier le client"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="ModalTitle">Modifier le client</h2>
        <form>
          <label className="label">Nom:</label>
          <input
            type="text"
            value={clientNom}
            onChange={(e) => setClientNom(e.target.value)}
            className="input"
          />
          <label className="label">Email:</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="input"
          />
          <label className="label">Entreprise:</label>
          <input
            type="text"
            value={clientEntreprise}
            onChange={(e) => setClientEntreprise(e.target.value)}
            className="input"
          />
          <label className="label">Adresse:</label>
          <textarea
            value={clientAdresse}
            onChange={(e) => setClientAdresse(e.target.value)}
            className="input"
          />
          <label className="label">Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setClientPhoto(e.target.files[0])}
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
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={handleCancelDelete}
        contentLabel="Supprimer le client"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="ModalTitle">Supprimer le client</h2>
        <p>Êtes-vous sûr de vouloir supprimer ce client ?</p>
        <div className="button-container">
          <button type="button" onClick={handleConfirmDelete} className="confirm-button">
            Confirmer
          </button>
          <button type="button" onClick={handleCancelDelete} className="cancel-button">
            Annuler
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default Portefeuil;
