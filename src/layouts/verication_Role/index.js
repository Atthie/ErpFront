
import { useState, useEffect, useContext} from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "../../routes/routesEm";
import { useMaterialUIController } from "context";

import SignIn from "layouts/authentication/sign-in";
import Dashboard_Vendeur from "layouts/dashboard_Vendeur";
import Dashboard_Em from "layouts/dashboard_Vendeur";


function Dashboard_EM() {

  
  const [controller, dispatch] = useMaterialUIController();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const {
    darkMode,
  } = controller;
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });
    const location = useLocation();
    const { userId, role } = location.state || {};    
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      { isLoggedIn ? (
          <> 
            <Routes>
              {getRoutes(routes)}
              {role === "Entreprise_Miniere" && <Route path="*" element={<Navigate to="/dashboard_Em" />} />}
              {role === "Vendeur" && <Route path="*" element={<Navigate to="/dashboard_Vendeur" />} />}

            </Routes>
          </> 
      ):(
        <Routes>
          <Route path="/" element={<SignIn/>}>
          </Route>
        </Routes>
      ) }
         
    </ThemeProvider>
  );
}
export default Dashboard_EM;
