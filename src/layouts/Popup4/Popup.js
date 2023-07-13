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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "duree") {
      setDuree(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/demandeCotations", {
        nom,
        description,
        duree,
      });

      if (response.status === 201) {
        toast.success("Demande de cotation créée avec succès");
        setNom("");
        setDescription("");
        setDuree("");
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
          <input
            name="duree"
            type="number"
            className="InputField1"
            placeholder="Durée"
            value={duree}
            onChange={handleInputChange}
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
