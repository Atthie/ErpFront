
import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";

import breakpoints from "assets/theme/base/breakpoints";

import backgroundImage from "assets/images/bg-profile.jpeg";
import { AppBar, Tabs, Tab, Toolbar, InputBase, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

  
    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="9.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage:`linear-gradient(195deg, #42424a, #191919)`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
         
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
          <AppBar position="static">
  <Toolbar>
   
    <div sx={{ flexGrow: 1 }} /> 
    <div sx={{ position: 'relative', borderRadius: '0.5rem', backgroundColor: 'linear-gradient(195deg, #42424a, #191919)' }}>
      <IconButton sx={{ p: '10px' }} aria-label="search" size="large">
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Rechercher..."
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  </Toolbar>
</AppBar>

          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
