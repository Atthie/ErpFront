import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Popup.css";

Modal.setAppElement("#root");

function Popupproduction() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [quantite, setQuantite] = useState("");
  const [photo, setPhoto] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "quantite") {
      setQuantite(e.target.value);
    } else if (e.target.name === "photo") {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("quantite", quantite);
    formData.append("photo", photo);

    try {
      const response = await axios.post("http://localhost:5000/articles", formData);

      if (response.status === 201) {
        toast.success("Article créé avec succès");
        setNom("");
        setDescription("");
        setQuantite("");
        setPhoto(null);
        closeModal();
      } else {
        toast.error("Une erreur est survenue lors de la création de l'article");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création de l'article");
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
        &nbsp;Nouvau Produit
      </MDButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="ModalTitle">Nouvau Produit</h2>
        <div className="ModalContent">
          <input
            name="Produit"
            className="InputField"
            placeholder="Produit"
            value={nom}
            onChange={handleInputChange}
          />
          <input
            name="Quantite"
            className="InputField"
            placeholder="Quantite"
            value={description}
            onChange={handleInputChange}
          />
          <input
            name="Ressource"
            type="text"
            className="InputField"
            placeholder="Ressource"
            value={quantite}
            onChange={handleInputChange}
          />

          <input
            name="Delai"
            type="text"
            className="InputField"
            placeholder="Délai"
            value={quantite}
            onChange={handleInputChange}
          />

         <input
            name="Etat"
            type="texte"
            className="InputField"
            placeholder="Etat"
            value={quantite}
            onChange={handleInputChange}
          />

          <input
            name="Coût"
            type="text"
            className="InputField"
            placeholder="Coût"
            value={quantite}
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

export default Popupproduction;
