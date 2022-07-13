import React, { useEffect, useState } from "react";
import "./TabProduct.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { ProductList } from "../sections/@dashboard/products";
import PRODUCTS from "../_mocks_/products";
import { Box, Container, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Page from "../components/Page";
// import ServiceList from "src/sections/@dashboard/products/ServiceList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

function TabsComponent(props) {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [service, setService] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const srvc =
      props.product &&
      props.product.filter(
        (ser) =>
          "product" == ser.type &&
          props.currentUser.attributes.username == ser.user?.username
      );
    setData(srvc);
    const prd =
      props.product &&
      props.product.filter(
        (ser) =>
          "service" == ser.type &&
          props.currentUser.attributes.username == ser.user?.username
      );
    setService(prd);
  }, [props]);

  return (
    <Container>
      <Grid item lg={12} md={12} xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Products" {...a11yProps(1)} />
            <Tab label="Services" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {props.product == null && (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          )}

          <ProductList products={data} currentUser={props.currentUser} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {props.product == null && (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          )}

          <ProductList products={service} currentUser={props.currentUser} />
        </TabPanel>
      </Grid>
    </Container>
  );
}

export default TabsComponent;
