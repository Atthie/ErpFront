
import Dashboard from "layouts/dashboard_EM";
import Commandes from "layouts/commandes/entreprise_Miniere";
import Vendeur from "layouts/vendeur"
import Demande_Cotation from "layouts/demande_Cotation/demande_cotation";
// @mui icons
import Icon from "@mui/material/Icon";
import Offre from "layouts/offre/offres";
import Overview from "layouts/profile";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard_Em",
    component: <Dashboard />,
    role: "vendeurs"
  },
  {
    type: "collapse",
    name: "Demande de Cotations",
    key: "sign-in",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/demande_cotation",
    component: <Demande_Cotation/>,
    role: "admin"

  },
  {
    type: "collapse",
    name: "Commandes",
    key: "tables",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/commande_Em",
    component: <Commandes />,
    role: "vendeurs"
  },

  
  {
    type: "collapse",
    name: "Offres",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/offre",
    component: <Offre />,
    role: "entreprise"
  },
 
  {
    type: "collapse",
    name: "Vendeurs",
    key: "sign-in",
    icon: <Icon fontSize="small">groups_2</Icon>,
    route: "/vendeur",
    component: <Vendeur />,
    role: "admin"

  },
  
  {
    type: "collapse",
    name: "Parametres",
    key: "tables",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/profile",
    component: <Overview />,
    role: "vendeurs"
  },
 
];

export default routes;
