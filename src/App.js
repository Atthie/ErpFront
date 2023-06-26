

import {  useEffect, useState} from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import {AppContext} from "context/idUser"

import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { useMaterialUIController } from "context";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Verification_Role from "layouts/verication_Role";
import Dashboard_Em from "layouts/dashboard_EM";
import Dashboard_Vendeur from "layouts/dashboard_Vendeur";
import Production from "layouts/production/production";

import Vendeur from "layouts/vendeur"
import Commandes_Entreprise_Miniere from "layouts/commandes/entreprise_Miniere";
import Stocks from "layouts/stocks/stocks";

import Offre from "layouts/offre/offres"
import Demande_Cotation from "layouts/demande_Cotation/demande_cotation";
export default function App() {
  const [controller] = useMaterialUIController();
  const {
    darkMode,
  } = controller;
  const { pathname } = useLocation();


  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

 const [idUser, setidUser]= useState(null)

 
  return (
    <AppContext.Provider value={{idUser, setidUser}}>
          <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
          
              <Routes>
                <Route path="/" element={<SignIn/>}></Route>
                <Route path="/inscription" element={<SignUp/>} />
                <Route path="/verification_Role" element={<Verification_Role/>} />
                <Route path="/dashboard_Em" element={<Dashboard_Em/>} />
                <Route path="/dashboard_Vendeur" element={<Dashboard_Vendeur/>} />
                <Route path="/commande_Em" element={<Commandes_Entreprise_Miniere/>} />
                <Route path="/offre" element={<Offre/>} />
                <Route path="/vendeur" element={<Vendeur/>} />
                <Route path="/stocks" element={<Stocks/>} />
                <Route path="/production" element={<Production/>} />
                <Route path="/demande_cotation" element={<Demande_Cotation/>} />

              </Routes>
            
              
          </ThemeProvider>
    </AppContext.Provider>
  );
}
