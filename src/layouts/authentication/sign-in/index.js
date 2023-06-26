
import { useState,useContext, useRef, useEffect } from "react";
import axios  from "axios"
import { Link, Navigate, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import {AppContext} from "context/idUser"

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import React, { createContext } from 'react';
const UserContext = createContext();


function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [pwd, setPassword] = useState("");
const navigate= useNavigate()
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const { idUser, setidUser} = useContext(AppContext);

  useEffect(() => {
    console.log(idUser); // Affiche la nouvelle valeur de idUser après la mise à jour
  }, [idUser]); 
  
  
  const signIn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/connexion", {
        username,
        pwd,
      });
      setidUser(response.data.id)
  
      navigate("/verification_Role",{ state: { userId: response.data.id, role : response.data.role } });
    } catch (error) {
      console.error(error);
      alert("An error occurred while signing in.");
    }
  };
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  return (
    
    <CoverLayout image={bgImage} >
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
         
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
            <MDInput type="text" name="username" label="Username" fullWidth value={username} onChange={handleUsernameChange}/>            </MDBox>
            <MDBox mb={2}>
            <MDInput type="password" name="pwd" label="Password" fullWidth value={pwd} onChange={handlePasswordChange}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient" 
                color="info" 
                fullWidth
                onClick={signIn}
                >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/inscription"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
    
  );
}
export { UserContext }
export default Basic;
