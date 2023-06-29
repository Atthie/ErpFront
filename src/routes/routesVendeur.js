
import Dashboard_Vendeur from "layouts/dashboard_EM";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Stocks from "layouts/stocks/stocks";
import Production from "layouts/production/production";
import Cotation from "layouts/cotation/cotation";
import Comptabilite from "layouts/comptabilite/comptabilite";
import Commande_Vendeur from "layouts/commande_Vendeur/Commande_vendeur";
import Portefeuil from "layouts/portefeuil/portefeuil";
import Overview from "layouts/profile";
import Parametre from "layouts/parametre/parametre";

const routesVendeur = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard_Vendeur",
    component: <Dashboard_Vendeur />,
    role: "vendeurs"
  },
  {
    type: "collapse",
    name: "Gestion de Stocks",
    key: "tables",
    icon: <Icon fontSize="small">inventory</Icon>,
    route: "/stocks",
    component: <Stocks />,
    role: "vendeurs"
  },

  {
    type: "collapse",
    name: "Plan de Production",
    key: "tables",
    icon: <Icon fontSize="small">pages</Icon>,
    route: "/production",
    component: <Production/>,
    role: "vendeurs"
  },

  {
    type: "collapse",
    name: "Cotation",
    key: "tables",
    icon: <Icon fontSize="small">article</Icon>,
    route: "/cotation",
    component: <Cotation/>,
    role: "vendeurs"
  },

  {
    type: "collapse",
    name: "Comptabilite",
    key: "tables",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/comptabilite",
    component: <Comptabilite/>,
    role: "vendeurs"
  },

  {
    type: "collapse",
    name: "Commandes",
    key: "tables",
    icon: <Icon fontSize="small">shopping_basket</Icon>,
    route: "/commande_vendeur",
    component: <Commande_Vendeur/>,
    role: "vendeurs"
  },

  {
    type: "collapse",
    name: "Portefeuil Client",
    key: "tables",
    icon: <Icon fontSize="small">account_balance_wallet</Icon>,
    route: "/portefeuil",
    component: <Portefeuil/>,
    role: "vendeurs"
  },

  {
    type: "collapse",
    name: "Parametres",
    key: "tables",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/profilr",
    component: <Overview/>,
    role: "vendeurs"
  },
  

];

export default routesVendeur;
