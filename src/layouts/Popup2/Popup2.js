import { Button } from "@mui/material"
import Swal from 'sweetalert2'
import MDButton from "components/MDButton"
import Icon from "@mui/material/Icon";



function Popup2 (){
       const showAlert = ()=>{
              Swal.fire({
                     title: 'Demande de Cotation',
                 
                     inputAttributes: {
                       autocapitalize: 'Terminer'
                     },
                   
                     showCancelButton: true,
                     confirmButtonText: 'Repondre',
                     showLoaderOnConfirm: true,
                    
                     html:
                     ''
                    ,

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

         
        
          <button onClick={showAlert} className="vp">Voir Plus</button> 

      
              
              
              
              
              



       )
} export default Popup2