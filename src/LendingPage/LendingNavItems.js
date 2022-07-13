import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoNav from "./Logo/logo.png";
import "./navbar.css";
import SignInModal from "../modal/SignInModal";
import { InitSwAuth } from "@skill-wallet/auth";

// const useStylesBootstrap = makeStyles((theme) => ({
//   tooltip: {
//     backgroundColor: "transparent",
//     color: theme.palette.common.black,
//   },
// }));

//
const pages = ["  ", ""];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBarItems = () => {
  const [siginOpen, setSignInOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    InitSwAuth();
  }, []);
  // const tooltipClass = useStylesBootstrap();

  return (
    <nav className="navBar">
      <AppBar position="static" className="navBar">
        <Container maxWidth="xl" background="#323239">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <a href="/">
                <img
                  alt=""
                  // width="100%"
                  height="60"
                  style={{ cursor: "pointer", marginLeft: "50px" }}
                  src={LogoNav}
                />
              </a>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                // style={{ backgroundColor: "green"}}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                  width: "100vw",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  // width: "100vw",
                }}
              >
                {/* {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        style={{ width: "100vw" }}
                                    >
                                        <Typography className="pagebtn" style={{ border: "1px solid white" }}>{page}</Typography>

                                    </MenuItem>
                                ))} */}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              // style={{ justifyContent: "right" }}
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <a href="/">
                <img
                  alt=""
                  width="200"
                  height="60"
                  style={{ cursor: "pointer" }}
                  src={LogoNav}
                />
              </a>
            </Typography>
            <Box
              style={{ justifyContent: "right", paddingRight: "30px" }}
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              {pages.map((page) => (
                <Button
                  // style={{backgroungColor:"green", margin:"20px"}}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    float: "right",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <button
              className="nft"
              onClick={async () => {
                setSignInOpen(true);
              }}
            >
              Sign In
            </button>{" "}
          </Toolbar>
          <SignInModal open={siginOpen} close={() => setSignInOpen(false)} />
        </Container>
      </AppBar>
    </nav>
  );
};
export default NavBarItems;

// -------------==================---Jaydip code ---------==============---------------
// import React from "react";

// function NavBarItems(props) {
//   return (
//     <ul className="navBarItems">
//       <li>
//         <a
//           href={props.link}
//           className={props.active ? "activeNavItems" : "nonactiveNavItems"}
//         >
//           {props.name}
//         </a>
//       </li>
//       {/* {
//           this.props.active ?
//             <div className='point'  />
//             :
//             <div className='point2' />
//         } */}
//     </ul>
//   );
// }

// export default NavBarItems;
