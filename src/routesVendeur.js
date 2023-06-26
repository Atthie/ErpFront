
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
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/stocks",
    component: <Stocks />,
    role: "vendeurs"
  },

  {
    type: "collapse",
    name: "Plan de Production",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/production",
    component: <Production/>,
    role: "vendeurs"
  },
  

];

export default routesVendeur;
