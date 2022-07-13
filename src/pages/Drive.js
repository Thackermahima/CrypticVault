import { Card, TableBody } from "@mui/material";
import {
  Button,
  Container,
  Stack,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";

import Page from "../components/Page";

import { Web3StorageContext } from "../context/Web3Storage";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

function Drive() {
  const web3StorageContext = React.useContext(Web3StorageContext);
  const { storeDriveFiles, getDocuments, isUpdated, loading, docsFiles } =
    web3StorageContext;

  useEffect(() => {
    getDocuments();
  }, [isUpdated]);

  async function onChange(e) {
    const data = e.target.files;

    try {
      if (
        data[0].type == "application/pdf" ||
        data[0].type == "application/json" ||
        data[0].type == "image/png" ||
        data[0].type == "image/jpg" ||
        data[0].type == "image/jpeg" ||
        data[0].type == "text/plain" ||
        data[0].type == "text/csv"
      ) {
        await storeDriveFiles(data[0]);
      } else {
        toast.error("Please upload pdf, json, txt, csv, png, jpg or jpeg!");
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  function handleSrc(type) {
    switch (type) {
      case "application/pdf":
        return "/images/pdf.png";
        break;
      case "application/json":
        return "/images/json.png";
        break;
      case "text/plain":
        return "/images/docs.png";
        break;
      case "text/csv":
        return "/images/csv.png";
        break;
      case "image/png":
        return "/images/image-file.png";
        break;
      case "image/jpg":
        return "/images/image-file.png";
        break;
      case "image/jpeg":
        return "/images/image-file.png";
        break;
      default:
        return "/images/docs.png";
        break;
    }
  }

  return (
    <Page title="Docs |  Cryptic Vault">
      <Container pl={0} pr={0}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          className="uploadArea"
        >
          <div className="d-create-file">
            <label
              htmlFor="files"
              id="get_file"
              name="image"
              className="btn-main"
              style={{
                backgroundColor: "#6dbf8b",
                fontSize: "16px",
                padding: "10px 20px 10px 20px",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
              }}
            >
              {loading ? "Uploading..." : "Upload"}
            </label>
            <input
              id="files"
              name="image"
              style={{ display: "none" }}
              type="file"
              onChange={onChange}
            />
          </div>
        </Stack>
        <Stack direction="row" spacing={2}>
          {docsFiles &&
            docsFiles.map((doc, index) => {
              return (
                <Grid xs={12} sm={3} md={2} key={index}>
                  <Card>
                    {console.log(doc.file)}
                    <Stack spacing={2} sx={{ p: 3 }}>
                      <img src={handleSrc(doc.type)}></img>
                      <a href={doc.file} target={"balank"}>
                        <Typography variant="subtitle2" noWrap>
                          {doc.name}
                        </Typography>
                      </a>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
        </Stack>
      </Container>
    </Page>
  );
}

export default Drive;
