import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { NavLink } from "react-bootstrap";

function Cover() {
  return (
    <CoverLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Inscription Emtreprise
          </MDTypography>
         
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Nom_Emtreprise" variant="standard" fullWidth />
            </MDBox>
            
            <MDBox mb={2}>
              <MDInput type="text" label="Description" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
           
            <MDBox mb={2}>
              <MDInput type="file" label="Logo" variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                S'Inscrirer
              </MDButton>
            </MDBox>

            <div className="nb">
              <img className="useOK" src="user.png"/>
              <NavLink className="insc" to="/inscriptionCli" href="/inscriptionCli">Je suis un Particulier</NavLink>
            </div>
            
               
            
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Je un Compte{" "}
                <MDTypography
                  component={Link}
                  to="/"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Connexion
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
