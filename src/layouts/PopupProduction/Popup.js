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
  const [ressource, setRessource] = useState("");
  const [delai, setDelai] = useState("");
  const [etat, setEtat] = useState("");
  const [cout, setCout] = useState("");
  const [quantite, setQuantite] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "ressource") {
      setRessource(e.target.value);
    } else if (e.target.name === "delai") {
      setDelai(e.target.value);
    } else if (e.target.name === "etat") {
      setEtat(e.target.value);
    } else if (e.target.name === "cout") {
      setCout(e.target.value);
    } else if (e.target.name === " quantite") {
      setQuantite(e.target.value);
    }
  };

  const handleSubmit = () => {
    // Créez un objet contenant les données que vous souhaitez envoyer à votre API
    const data = {
      nom: nom,
      ressource: ressource,
      delai: delai,
      etat: etat,
      cout: cout
    };
  
    // Envoyez les données à votre API en utilisant Axios
    axios.post('http://localhost:5000/Production/enregistrer', data)
      .then(response => {
        // Réponse de succès de l'API
        console.log(response.status);
        // Réinitialisez les valeurs des champs après avoir envoyé les données avec succès
        setNom('');
        setRessource('');
        setDelai('');
        setEtat('');
        setCout('');
        setModalIsOpen(false);
      })
      
      .catch(error => {
        // Erreur lors de l'envoi des données à l'API
        console.log(error);
      });
  };
  

  // const handleSubmit = async () => {
  //   // const formData = new FormData();


  //   //formData.append("nom", );
  //   // formData.append("ressource", ressource);
  //   // formData.append("delai", delai);
  //   // formData.append("etat", etat);
  //   // formData.append("cout", cout);
  //   // formData.append("quantite", quantite);

  //   const id =1
  //   try {
  //     const response = await axios.post("http://localhost:5000/Production/enregistrer", id);

  //     if (response.status === 201) {
  //       toast.success("A créé avec succès");
  //       setNom("");
  //       setRessource("");
  //       setDelai("");
  //       setEtat("");
  //       setCout("");
  //       setQuantite("");
  //       closeModal();
  //     } else {
  //       toast.error("Une erreur est survenue lors de la création du produit");
  //     }
  //   } catch (error) {
  //     toast.error("Une erreur est survenue lors de la création du produit");
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
            name="nom"
            className="InputField"
            placeholder="Nom"
            value={nom}
            onChange={handleInputChange}
            required 
          />
          <input
           name="ressource"
           className="InputField"
           placeholder="Ressource"
           value={ressource}
           onChange={handleInputChange}
           required
          />

          {/* <input
            name="quantite"
            type="number"
            className="InputField"
            placeholder="quantite"
            value={quantite}
            onChange={handleInputChange}
            
          /> */}

          <input
            name="delai"
            type="date"
            className="InputField"
            placeholder="delai"
            value={delai}
            onChange={handleInputChange}
          />

         <input
            name="etat"
            type="texte"
            className="InputField"
            placeholder="etat"
            value={etat}
            onChange={handleInputChange}
          />

          <input
            name="cout"
            type="text"
            className="InputField"
            placeholder="cout"
            value={cout}
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

export default Popupproduction;
