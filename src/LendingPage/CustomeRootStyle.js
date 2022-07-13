import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Iconify from "../components/Iconify";
import { Typography } from "@mui/material";

function CustomeRootStyle(props) {
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
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="icon-park-outline:agreement" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3" color="#000">
        Scale across the Globe
      </Typography>
      <Typography variant="subtitle2" color="#6dbf8b" sx={{ opacity: 0.72 }}>
        Showcase your work globally and Send/Receive crypto payment easily
        without any boundaries.
      </Typography>
    </RootStyle>
  );
}

export default CustomeRootStyle;
