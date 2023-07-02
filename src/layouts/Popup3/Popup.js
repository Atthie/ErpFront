import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Popup.css";

Modal.setAppElement("#root");

function Popup() {
  const [nom, setNom] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "entreprise") {
      setEntreprise(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "adresse") {
      setAdresse(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!nom || !entreprise || !email || !adresse) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("entreprise", entreprise);
    formData.append("email", email);
    formData.append("adresse", adresse);

    try {
      const response = await axios.post("http://localhost:4000/clients", formData);

      if (response.status === 201) {
        toast.success("Client créé avec succès");
        setNom("");
        setEntreprise("");
        setEmail("");
        setAdresse("");
        closeModal();
      } else {
        toast.error("Une erreur est survenue lors de la création du client");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création du client");
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="BtnAjt">
      <MDButton onClick={openModal} variant="gradient" color="dark">
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        &nbsp;Ajouter un Client
      </MDButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="ModalTitle">Créer un Nouveau Client</h2>
        <div className="ModalContent">
          <input
            name="nom"
            className="InputField"
            placeholder="Nom"
            value={nom}
            onChange={handleInputChange}
            required
          />
          <input
            name="entreprise"
            className="InputField"
            placeholder="Entreprise"
            value={entreprise}
            onChange={handleInputChange}
            required
          />
          <input
            name="email"
            className="InputField"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <input
            name="adresse"
            className="InputField"
            placeholder="Adresse"
            value={adresse}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="ModalActions">
          <button className="CancelButton" onClick={closeModal}>
            Annuler
          </button>
          <button className="ConfirmButton" onClick={handleSubmit}>
            Confirmer
          </button>
        </div>
      </Modal>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Popup;
