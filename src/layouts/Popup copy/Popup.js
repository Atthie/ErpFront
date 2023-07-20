import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Popup.css";

Modal.setAppElement("#root");

function PopupComptabilite() {
  const [montant, setmontant] = useState("");
  const [description, setdescription] = useState("");
  const [transaction, settransaction] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "montant") {
      setmontant(e.target.value);
    } else if (e.target.name === "description") {
      setdescription(e.target.value);
    } else if (e.target.name === "transaction") {
      settransaction(e.target.value);
    } 
  };

  const handleSubmit = () => {
    // Créez un objet contenant les données que vous souhaitez envoyer à votre API
    const data = {
      montant: montant,
      description: description,
      transaction: transaction
    };
  
    // Envoyez les données à votre API en utilisant Axios
    axios.post('http://localhost:5000/transaction', data)
      .then(response => {
        // Réponse de succès de l'API
        console.log(response.status);
        // Réinitialisez les valeurs des champs après avoir envoyé les données avec succès
        setmontant('');
        setdescription('');
        settransaction('');
        setModalIsOpen(false);
      })
      
      .catch(error => {
        // Erreur lors de l'envoi des données à l'API
        console.log(error);
      });
  };







  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   formData.append("montant", montant);
  //   formData.append("description", description);
  //   formData.append("transaction", transaction);

  //   try {
  //     const response = await axios.post("http://localhost:5000/transaction", formData);

  //     if (response.status === 201) {
  //       toast.success("transaction créé avec succès");
  //       setmontant("");
  //       setdescription("");
  //       //settransaction//("");
  //       //closeModal//();//
  //     } else {
  //       toast.error("Une erreur est survenue lors de la création de la transaction");
  //     }
  //   } catch (error) {
  //     toast.error("Une erreur est survenue lors de la création de la transaction");
  //   }
  // };

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
        &nbsp;Ajouter une transaction
      </MDButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="ModalTitle">Créer une Nouvel transaction</h2>
        <div className="ModalContent">
          <input
            name="montant"
            type="number"
            className="InputField"
            placeholder="montant"
            value={montant}
            onChange={handleInputChange}
          />
          <input
            name="description"
            className="InputField"
            placeholder="description"
            value={description}
            onChange={handleInputChange}
          />
          <input
            name="transaction"
            type="text"
            className="InputField"
            placeholder="transaction"
            value={transaction}
            onChange={handleInputChange}
          />
          
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

export default PopupComptabilite;
