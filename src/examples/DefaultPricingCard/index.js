/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";
import DefaultPricingCard from "examples/Cards/PricingCards/DefaultPricingCard";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

<DefaultPricingCard
  badge={{ color: "light", label: "starter" }}
  price={{ currency: "$", value: "99", type: "mo" }}
  specifications={[
    { label: "2 team members", includes: true },
    { label: "20GB Cloud storage", includes: true },
    { label: "Integration help", includes: false },
    { label: "Sketch Files", includes: false },
    { label: "API Access", includes: false },
    { label: "Complete documentation", includes: false },
  ]}
  action={{
    type: "internal",
    route: "/",
    color: "dark",
    label: "join",
  }}
/>



export default DefaultPricingCard;
