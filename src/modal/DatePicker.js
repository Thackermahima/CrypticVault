import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { TextField, Box } from "@mui/material";

import { styled } from "@mui/material/styles";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Input = styled("input")({
  display: "none",
});
function DatePickerComponent({ value, handleChange, open, close }) {
  return (
    <div>
      <Dialog open={open} onClose={close} sx="sm">
        {/* <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Slect Date
        </DialogTitle> */}
        <DialogContent style={{ overflowX: "hidden" }}>
          <div>
            <Box style={{ marginBottom: "20px" }}>
              Select Date to give access on particular date
            </Box>
            <Box style={{ marginBottom: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default DatePickerComponent;
