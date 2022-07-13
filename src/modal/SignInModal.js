import React from "react";
// material
import { styled } from "@mui/material/styles";

// components
import Page from "../components/Page";

import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  Container,
  FormControl,
  Grid,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Web3Context } from "../context/Web3Context";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

// ----------------------------------------------------------------------

export default function Login(props) {
  const navigate = useNavigate();
  const web3Context = React.useContext(Web3Context);
  const { signInAsAdmin, aLoading, signInAsMember } = web3Context;
  const [type, setType] = useState("admin");

  const formik = useFormik({
    initialValues: {
      tName: "",
      symbol: "",
      address: "",
    },
    onSubmit: async (values) => {
      if (type == "admin") {
        await signInAsAdmin(values);
      } else {
        await signInAsMember(values);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Dialog open={props.open} onClose={props.close} fullWidth>
      <DialogTitle
        style={{
          textAlign: "center",
        }}
      >
        Sign In
      </DialogTitle>

      <DialogContent style={{ overflowX: "hidden" }}>
        <RootStyle title="Login | Cryptic Vault">
          <Container maxWidth="sm">
            <FormControl sx={{ marginBottom: "2px" }}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={type}
                onChange={() => setType(event.target.value)}
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Sign In as Admin"
                />
                <FormControlLabel
                  value="member"
                  control={<Radio />}
                  label="Sign In as Member"
                />
              </RadioGroup>
            </FormControl>

            <form
              onSubmit={handleSubmit}
              style={{
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                // marginTop: "100px",
              }}
            >
              {type == "member" ? (
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Enter admin wallet address"
                    name="address"
                    id="address"
                    type="text"
                    required
                    {...formik.getFieldProps("address")}
                  />
                </Stack>
              ) : (
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Enter token name"
                    name="tName"
                    id="tName"
                    type="text"
                    required
                    {...formik.getFieldProps("tName")}
                  />
                  <TextField
                    fullWidth
                    label="Enter token symbol"
                    name="symbol"
                    id="symbol"
                    type="text"
                    required
                    {...formik.getFieldProps("symbol")}
                  />
                </Stack>
              )}
              <DialogActions>
                <Grid container justifyContent="center">
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={aLoading}
                  >
                    {aLoading ? "Loading..." : "Sign In"}
                  </Button>
                </Grid>
              </DialogActions>
            </form>
          </Container>
        </RootStyle>
      </DialogContent>
    </Dialog>
  );
}
