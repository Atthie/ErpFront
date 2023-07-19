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
  const [description, setDescription] = useState("");
  const [duree, setDuree] = useState("");
  const [etat, setEtat] = useState("Veuillez déterminer l'état");
  const [dateFin, setDateFin] = useState(""); // Nouvel état pour la date de fin
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "duree") {
      setDuree(e.target.value);
      if (e.target.value === "3") {
        setEtat("Urgente");
      } else {
        setEtat("En Cour");
      }
    } else if (e.target.name === "dateFin") {
      setDateFin(e.target.value); // Met à jour la date de fin
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/demandeCotations", {
        nom,
        description,
        duree,
        etat,
        dateFin, // Ajoute la date de fin dans les données de la demande de cotation
      });

      if (response.status === 201) {
        toast.success("Demande de cotation créée avec succès");
        setNom("");
        setDescription("");
        setDuree("");
        setEtat("Veuillez déterminer l'état");
        setDateFin(""); // Réinitialise la date de fin
        closeModal();
      } else {
        toast.error("Une erreur est survenue lors de la création de la demande de cotation");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création de la demande de cotation");
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
        &nbsp;Ajouter une cotation
      </MDButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal1"
        overlayClassName="Overlay"
      >
        <h2 className="ModalTitle">Créer une nouvelle demande de cotation</h2>
        <div className="ModalContent">
          <input
            name="nom"
            className="InputField"
            placeholder="Nom"
            value={nom}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            className="TextaeaField"
            placeholder="Description"
            value={description}
            onChange={handleInputChange}
          />
          <div className="Modal2">
            <input
              name="duree"
              type="number"
              className="InputField1"
              placeholder="Durée"
              value={duree}
              onChange={handleInputChange}
            />
            <input
              name="dateFin"
              type="date"
              className="InputField1"
              placeholder="Date de fin"
              value={dateFin}
              onChange={handleInputChange}
            />
            <select
              name="etat"
              className="SelectField"
              value={etat}
              onChange={handleInputChange}
            >
              <option disabled>Veuillez déterminer l'état</option>
              <option value="Urgente">Urgente</option>
              <option value="En Cour">En Cour</option>
              <option value="Valider">Valider</option>
            </select>
          </div>
        </div>
        <div className="ModalActions">
          <button className="CancelButton2" onClick={closeModal}>
            Annuler
          </button>
          <button className="ConfirmButton1" onClick={handleSubmit}>
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
