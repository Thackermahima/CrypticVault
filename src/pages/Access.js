import { Card, TableBody } from "@mui/material";
import {
  Container,
  Stack,
  Box,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Iconify from "src/components/Iconify";
import { Web3Context } from "src/context/Web3Context";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Page from "../components/Page";
import CreateMemberModal from "src/modal/CreateMember";
import DatePickerComponent from "../modal/DatePicker";

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

function Access() {
  const navigate = useNavigate();
  const web3Context = React.useContext(Web3Context);
  const {
    sendEmail,
    emergencyAlert,
    getEmergencyAlert,

    getMembers,
    members,
    transferToken,
    createTaskInGelato,
  } = web3Context;

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openDays, setOpenDays] = React.useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  const [dateValue, setDateValue] = React.useState();
  const [member, setMember] = React.useState();

  const handleDateChange = async (newValue) => {
    setDateValue(newValue);
    console.log(member);
    var date = new Date(newValue);
    var seconds = date.getTime() / 1000;

    await createTaskInGelato(member.address, seconds, {
      subject: emergencyAlert?.subject,
      message: emergencyAlert?.message,
      name: member.name,
      reply_to: member.email,
    });
  };

  const access = [
    {
      title: "Grant access right away",
      value: 0,
    },
    {
      title: "Emergency Transfer",
      value: 1,
    },
    {
      title: "On selected date",
      value: 2,
    },
  ];

  useEffect(() => {
    getMembers();
    getEmergencyAlert();
  }, [isUpdated]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const giveAccessNow = async (data) => {
    setLoading(true);
    try {
      let tx = await transferToken(member.address, data);
      if (tx) {
        setLoading(false);
        setOpenAlert(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Page title="Members |  Cryptic Vault">
      <Container pl={0} pr={0}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Access Permission
          </Typography>
        </Stack>
        <Stack>
          <Card>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Access Permissions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members && members.length == 0 && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                        <h5>No members are added yet!</h5>
                      </TableCell>
                    </TableRow>
                  )}
                  {members &&
                    members.map((member) => (
                      <TableRow>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Access
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="access"
                              label="Access"
                              disabled={member.transferStatus}
                              onChange={(e) => {
                                console.log(e.target.value);
                                if (e.target.value == 0) {
                                  setOpenAlert(true);
                                  setMember(member);
                                } else if (e.target.value == 2) {
                                  setIsOpen(true);
                                  setMember(member);
                                } else {
                                  setOpenDays(true);
                                  setMember(member);
                                }
                              }}
                            >
                              {access.map((a) => {
                                return (
                                  <MenuItem value={a.value}>{a.title}</MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                          <p>
                            {member.transferStatus
                              ? "Permission has been already given!"
                              : ""}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Dialog
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                sx="sm"
              >
                <DialogTitle
                  style={{
                    textAlign: "center",
                  }}
                >
                  Alert
                </DialogTitle>
                <DialogContent style={{ overflowX: "hidden" }}>
                  <div>
                    <Box style={{ marginBottom: "20px" }}>
                      Make sure your emergency alert details are filled!
                    </Box>
                  </div>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    disabled={loading}
                    onClick={() => {
                      giveAccessNow({
                        subject: emergencyAlert?.subject,
                        message: emergencyAlert?.message,
                        name: member.name,
                        reply_to: member.email,
                      });
                    }}
                  >
                    {loading ? "Loading..." : "Yes"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/dashboard/alert")}
                  >
                    No
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openDays}
                onClose={() => setOpenDays(false)}
                sx="sm"
              >
                <DialogTitle
                  style={{
                    textAlign: "center",
                  }}
                >
                  Emergency Transfer
                </DialogTitle>
                <DialogContent style={{ overflowX: "hidden" }}>
                  <div>
                    <Box style={{ marginBottom: "20px" }}>
                      Add number of days for emergency transfer.
                    </Box>

                    <TextField
                      fullWidth
                      type="number"
                      label="Enter number of days"
                      name="days"
                    />
                  </div>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    disabled={loading}
                    onClick={() => {}}
                  >
                    Set
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setOpenDays(false)}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </TableContainer>
            <DatePickerComponent
              open={isOpen}
              close={() => setIsOpen(false)}
              value={dateValue}
              handleChange={handleDateChange}
            ></DatePickerComponent>
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}

export default Access;
