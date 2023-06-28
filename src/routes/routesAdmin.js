
import Dashboard from "layouts/dashboard_EM";

import Commandes from "layouts/commandes/entreprise_Miniere";
import Vendeur from "layouts/vendeur"
import Demande_Cotation from "layouts/demande_Cotation/demande_cotation";
// @mui icons
import Icon from "@mui/material/Icon";
import Offre from "layouts/offre/offres";
import Overview from "layouts/profile";
import { Article } from "@mui/icons-material";
import Clients_Vend from "layouts/clients/clients";
import Mining from "layouts/mining/mining";
import Users from "layouts/users/users";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard_Admin",
    component: <Dashboard />,
    role: "Admin"
  },
  {
    type: "collapse",
    name: "Articles",
    key: "sign-in",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/articles",
    component: <Article/>,
    role: "Admin"

  },

  {
    type: "collapse",
    name: "Vendeurs",
    key: "sign-in",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/clients_vend",
    component: <Clients_Vend/>,
    role: "Admin"

  },

  {
    type: "collapse",
    name: "Emtreprises",
    key: "sign-in",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/mining",
    component: <Mining/>,
    role: "Admin"
  },

  {
    type: "collapse",
    name: "Gestion des Utilisateurs",
    key: "sign-in",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/users",
    component: <Users/>,
    role: "Admin"
  },
  
  
  {
    type: "collapse",
    name: "Parametres",
    key: "tables",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/profile",
    component: <Overview />,
    role: "Admin"
  },
 
];

export default routes;
