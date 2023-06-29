import { Button } from "@mui/material"
import Swal from 'sweetalert2'
import MDButton from "components/MDButton"
import Icon from "@mui/material/Icon";


function AjouterVend (){
       const showAlert = ()=>{
              Swal.fire({
                     title: 'Nouvau Vendeur',
                 
                     inputAttributes: {
                       autocapitalize: 'Annuler'
                     },
                   
                     showCancelButton: true,
                     confirmButtonText: 'Confirmer',
                     showLoaderOnConfirm: true,
                    
                     html:
                     '<input id="input1" class="swal2-input" placeholder="Nom_Vendeurs">' +
                     '<input id="input2" type="text" class="swal2-input" placeholder="Description">'
                     + '<input type="email" id="input3" class="swal2-input" placeholder="Email">' + 
                     '<input type="password" id="input3" class="swal2-input" placeholder="Mot de passe">' + 
                     '<input type="" id="input3" class="swal2-input" placeholder="Logo">',

                     preConfirm: () => {
                            const input1Value = document.getElementById('input1').value;
                            const input2Value = document.getElementById('input2').value;
                            const input3Value = document.getElementById('input2').value;
                            // Effectuez ici les actions souhaitées avec les valeurs des inputs
                          },



                     preConfirm: (login) => {
                       return fetch(`//api.github.com/users/${login}`)
                         .then(response => {
                           if (!response.ok) {
                             throw new Error(response.statusText)
                           }
                           return response.json()
                         })
                         .catch(error => {
                           Swal.showValidationMessage(
                             `Request failed: ${error}`
                           )
                         })
                     },
                     allowOutsideClick: () => !Swal.isLoading()
                   }).then((result) => {
                     if (result.isConfirmed) {
                       Swal.fire({
                         title: `${result.value.login}'s avatar`,
                         imageUrl: result.value.avatar_url,
                         text: 'Inputs values: ' + document.getElementById('input1').value + ', ' + document.getElementById('input2').value,
                       })
                     }
                   })
       }
       return(


              <div className="BtnAjt"> <MDButton  onClick={showAlert} variant="gradient" color="dark">
                     <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                     &nbsp;Nouvau Vendeur
                     </MDButton>
              </div>
              
              
              
              
              



       )
} export default AjouterVend