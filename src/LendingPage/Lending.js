import React, { Fragment } from "react";
import "./Lending.css";
import Background from "../assets/Back.png";
import { Card } from "react-bootstrap";
import { alpha, styled } from "@mui/material/styles";

import TopImage from "../assets/dao-2.png";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import MetamaskImg from "../assets/metamask.png";
import wallet from "../assets/wallet.png";
import "./home.css";

import { Link } from "react-router-dom";

import SubscriptionRoot from "./SubscriptionRoot";
import ProductRoot from "./ProductRoot";
import InvoicingRoot from "./InvoicingRoot";

export default function Lending() {
  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    border: "none",
    textAlign: "center",
    padding: theme.spacing(5, 5),
    color: theme.palette.primary.main,
  }));

  const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0
    )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
  }));
  return (
    <Fragment>
      <div>
        <header></header>
        <div className="container section-margin">
          <div className="row">
            <div className="col-12">
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="launchModel"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 1000,
                }}
              >
                <div className="model-paper">
                  <h2 id="transition-modal-title">Welcome to FORX1</h2>
                  <p id="transition-modal-description" className="text-center">
                    react-transition-group animates me.
                  </p>
                  <div className="launch-model-margin">
                    <div className="model-metamask">
                      <img src={MetamaskImg} alt="" width="20" height="20" />
                      <p>MetaMask</p>
                    </div>
                    <div className="model-wallet border-none">
                      <img src={wallet} alt="" width="20" height="20" />
                      <p>Wallet Connect</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <Link to="/inventory" className="enterBtn">
                      continue
                    </Link>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="col-12 col-lg-12 col-md-12  ">
              <h1 className="home-header-text">
                Your <span style={{ color: "#6EBF8B" }}>Decentralized</span>{" "}
                Digital Vault!
              </h1>
              <p className="home-body-text">
                The Cryptic Vault helps to store digital assets and to share
                access with people you trust.
              </p>
              <div className="watch-video-button mr-2">
                <button className="enterBtn">Learn More</button>
              </div>
            </div>
            {/* <div className="col-12 col-lg-5 col-md-5 home-top-image">
              <img src={TopImage} alt="" height="auto" width="100%" />
            </div> */}
          </div>
        </div>

        <div className="container-fluid bg-color-section-3 section-margin ">
          <div className="row">
            <div className="col-12 col-lg-6 text-center m-auto  ">
              <h1
                className="section-header-text mt-4 "
                style={{ fontSize: "36px", fontWeight: "bold" }}
              >
                The <span style={{ color: "#6EBF8B" }}>Cryptic Vault </span>{" "}
                Covers
              </h1>
            </div>
          </div>
          <div className="container  mt-5 mb-5 ">
            {/* <div className="row">
            </div> */}
            <div className="row">
              <div className="col-12 col-lg-4 col-md-4 mt-4">
                <SubscriptionRoot />
              </div>

              <div className="col-12 col-lg-4 col-md-4 mt-4">
                <ProductRoot />
              </div>

              <div className="col-12 col-lg-4 col-md-4 mt-4">
                <InvoicingRoot />
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid  section-margin mb-5">
          <div className="row">
            <div className="col-12 col-lg-6 text-center m-auto  ">
              <h1
                className="section-header-text "
                style={{ marginBottom: "90px" }}
              >
                How does it work ?
              </h1>
            </div>
          </div>
          <div className="col-8 m-auto">
            <div className="row">
              <div className="col-12 col-lg-4 col-md-4">
                <p className="section-token">Create NFT Memberships</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4">
                <p className="section-token"> Create members</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4">
                <p className="section-token">Assign Access Permissions </p>
              </div>
              <div className="col-12 col-lg-4 col-md-4">
                <p className="section-token">Encrypted - Decrypted Drive </p>
              </div>
              <div className="col-12 col-lg-4 col-md-4">
                <p className="section-token">Encrypted - Decrypted Notes</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4">
                <p className="section-token">Encrypted - Decrypted Email</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
