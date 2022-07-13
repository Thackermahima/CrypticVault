import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Stack,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
  Container,
  Box,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { ethers } from "ethers";

import { Web3StorageContext } from "../context/Web3Storage";
import { crypticVaultContract } from "../config";
import crypticVault from "../abi/CrypticVault.json";

const Input = styled("input")({
  display: "none",
});
function CreateMemberModal(props) {
  const [loading, setLoading] = useState(false);

  const web3StorageContext = React.useContext(Web3StorageContext);
  const { makeFileObjects, storeJsonFiles } = web3StorageContext;

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
    },

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const crypticVaultCon = new ethers.Contract(
          crypticVaultContract,
          crypticVault.abi,
          signer
        );
        let files = await makeFileObjects(
          values,
          "member.json",
          "application/json"
        );
        let cid = await storeJsonFiles(files);
        let tansactionCreateMember = await crypticVaultCon.createMembers(cid);
        let tx = await tansactionCreateMember.wait();
        if (tx) {
          props.setIsUpdated(!props.isUpdated);
          resetForm();
          setLoading(false);
          props.close();
          toast.success("Successfully Members created!!");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);

        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <div>
      <Dialog open={props.op} onClose={props.close} fullWidth>
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Create Member
        </DialogTitle>
        <DialogContent style={{ overflowX: "hidden" }}>
          <div>
            <Box style={{ marginBottom: "20px" }}></Box>
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
                  label="Name"
                  name="name"
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                <TextField
                  fullWidth
                  label="Wallet Address"
                  name="address"
                  id="address"
                  type="text"
                  {...formik.getFieldProps("address")}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
              </Stack>

              <DialogActions>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={formik.isSubmitting}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create"}
                </LoadingButton>
                <Button onClick={props.close} variant="contained">
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CreateMemberModal;
