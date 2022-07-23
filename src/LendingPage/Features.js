// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

// component
import Iconify from "../components/Iconify";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  // color: theme.palette.success.darker,
  // backgroundColor: theme.palette.success.lighter
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
  color: theme.palette.success.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.success.dark,
    0
  )} 0%, ${alpha(theme.palette.success.dark, 0.24)} 100%)`,
}));
// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function Features({ name, icon }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h4" color="#000">
        {name}
      </Typography>
    </RootStyle>
  );
}
