import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Link,
  Container,
  Typography,
  Grid,
  CardContent,
  Avatar,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { ProductList } from "src/sections/@dashboard/products";
import PRODUCTS from "../_mocks_/products";
import { LoadingButton } from "@mui/lab";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

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

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const [user, setUser] = useState();
  const [skills, setSkills] = useState([]);
  const [userAll, setUserAll] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [userServices, setUserServices] = useState([]);

  const [ratvalue, setRatValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const { name } = useParams();
  

  

    let skillsArray = [];

    let skillsSplit = usr && usr.length > 0 && usr[0].skills?.split(",");
    if (skillsSplit && skillsSplit !== null && skillsSplit.length > 0) {
      for (let i = 0; i < skillsSplit.length; i++) {
        skillsArray.push(skillsSplit[i]);
      }
    }
    setSkills(skillsArray);
  }, [data]);

  useEffect(async () => {
    const products = JSON.parse(JSON.stringify(data1));
    console.log(products);
    const all =
      products && products.filter((ser) => ser.user?.username == name);

    setUserAll(all);
    const prd =
      products &&
      products.filter(
        (ser) => "product" == ser.type && ser.user?.username == name
      );
    setUserProducts(prd);
    const srv =
      products &&
      products.filter(
        (ser) => "service" == ser.type && ser.user?.username == name
      );
    setUserServices(srv);
  }, [data1, user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <RootStyle title="Profile | DAOManagmentTool">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3, mt: 5 }} variant="h4">
            User Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={4} xs={12}>
              <Card sx={{ border: "1px solid #eee" }}>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src={user?.Avatar ? user?.Avatar.url : "/images/daoToolLogo.png"}
                      sx={{
                        height: 100,
                        mb: 2,
                        width: 100,
                      }}
                    />
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      Name
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="body">
                      @{user?.username}
                    </Typography>
                  </Box>
                  <Divider sx={{ margin: "10px 0" }} />

                  <Box
                    sx={{
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      Rating
                    </Typography>
                    <Rating
                      name="hover-feedback"
                      value={value}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setRatValue(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {ratvalue !== null && (
                      <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : value]}
                      </Box>
                    )}
                  </Box>

                  <Divider sx={{ margin: "10px 0" }} />
                  <Box
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <LoadingButton
                      size="large"
                      type="submit"
                      variant="contained"
                      component={RouterLink}
                      to={`/dashboard/chat/${user?.objectId}`}
                      // onClick={uploadFile}
                    >
                      Send Message
                    </LoadingButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={8} md={8} xs={12}>
              <Card sx={{ border: "1px solid #eee" }}>
                <CardContent>
                  <Box sx={{}}>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      Bio: {user?.bio}
                    </Typography>

                    <Typography color="textPrimary" gutterBottom variant="body">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </Typography>
                    <Box sx={{ mt: "15px", mb: "15px" }}>
                      <Typography color="textPrimary" gutterBottom variant="h5">
                        Skills:
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {skills.map((skill) => (
                          <Chip label={skill} />
                        ))}
                      </Stack>
                    </Box>
                    <Box>
                      <Typography color="textPrimary" gutterBottom variant="h5">
                        Available for:
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip label="Work" />
                        <Chip label="Idea discussion" />
                        <Chip label="Consultancy" />
                      </Stack>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid item lg={12} md={12} xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Products" {...a11yProps(1)} />
                <Tab label="Services" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ProductList products={userAll} currentUser={user} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ProductList products={userProducts} currentUser={user} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ProductList products={userServices} currentUser={user} />
            </TabPanel>
          </Grid>
        </Container>
      </Box>
    </RootStyle>
  );
}
