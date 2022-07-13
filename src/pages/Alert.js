import React from "react";
// material
import { styled } from "@mui/material/styles";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";

import AuthSocial from "../sections/authentication/AuthSocial";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, Container, Grid, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

import DialogTitle from "@mui/material/DialogTitle";
import { Web3Context } from "src/context/Web3Context";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

// ----------------------------------------------------------------------

export default function Alert() {
  const navigate = useNavigate();

  const web3Context = React.useContext(Web3Context);
  const { createEmergencyAlert, getEmergencyAlert, emergencyAlert } =
    web3Context;

  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    getEmergencyAlert();
  }, [isUpdated]);

  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        let tx = await createEmergencyAlert(values);
        if (tx) {
          setIsUpdated(!isUpdated);
          setLoading(false);
          toast.success("Successfully Added Emergency Alert!!");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <RootStyle title=" Emergency Alert |  Cryptic Vault">
      <Container maxWidth="sm">
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Emergency Alert
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            // marginTop: "100px",
          }}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              id="subject"
              type="text"
              {...formik.getFieldProps("subject")}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              id="message"
              type="text"
              multiline
              rows={2}
              maxRows={10}
              {...formik.getFieldProps("message")}
            />

            <Grid container justifyContent="center">
              <Button
                //   color="primary"
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Loading..." : "Set"}
              </Button>
            </Grid>
          </Stack>
        </form>
        {emergencyAlert?.subject && (
          <div className="container alert">
            <h4>Subject: {emergencyAlert?.subject}</h4>
            <p>
              <h4>Message: </h4>
              {emergencyAlert?.message}
            </p>
            <p>
              <h4>By: </h4>
              {emergencyAlert?.user}
            </p>
          </div>
        )}
      </Container>
    </RootStyle>
  );
}
