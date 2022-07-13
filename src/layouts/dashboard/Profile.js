import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { border, borderRadius } from "@mui/system";
import "./Profile.css";

// ----------------------------------------------------------------------

const Input = styled("input")({
  display: "none",
});

export default function Profile() {
  // const [email, setEmail] = useState('');

  // const [uploadfile, setuploadFile] =useState("");

  // Handles file upload event and updates state
  // function handleUpload(event) {
  //   setFile(event.target.files[0]);

  //   // Add code here to upload file to server
  //   // ...
  // }
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      //   .min(2, "Too Short!")
      //   .max(50, "Too Long!")
      .required("Username required"),
    bio: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Bio is required"),
    // email: Yup.string()
    //   .email("Email must be a valid email address")
    //   .required("Email is required"),
    skills: Yup.string().required("Skill is required"),
    file: Yup.string().required("Upload file is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      //   email: "",
      bio: "",
      skills: "",
      file: "",
    },
    validationSchema: RegisterSchema,
    // onSubmit: () => {
    //   alert(e.target);

    // },
  });
  // function fileupload(e) {
  //   setFile(e.target.files[0]);
  //   console.log(setFile,'setfile');
  //   if(setFile === null){
  //     alert('please fill the field')
  //   }

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik} className={Container}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{
          width: "50vw",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
        }}
      >
        <Stack spacing={3}>
          <div className="d-create-file">
            <div>
              <p id="file_name" className="text-grey-500">
                PNG, JPG, GIF, WEBP or MP4. Max 200mb.
              </p>
            </div>

            <label
              htmlFor="files"
              id="get_file"
              // name="file"
              className="btn-main"
              type="file"
              {...getFieldProps("file")}
              error={Boolean(touched.file && errors.file)}
              helperText={touched.file && errors.file}
            >
              Browse
            </label>
            <TextField
              id="files"
              type="file"
              style={{ display: "none" }}
              {...getFieldProps("file")}
              error={Boolean(touched.file && errors.file)}
              helperText={touched.file && errors.file}
              // onChange={}
            />
          </div>
          <TextField
            fullWidth
            autoComplete="username"
            type="name"
            label="User name"
            {...getFieldProps("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          {/* <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          /> */}

          <TextField
            fullWidth
            autoComplete="username"
            type="bio"
            label="Bio"
            {...getFieldProps("bio")}
            error={Boolean(touched.bio && errors.bio)}
            helperText={touched.bio && errors.bio}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="skills"
            label="Skills"
            {...getFieldProps("skills")}
            error={Boolean(touched.skills && errors.skills)}
            helperText={touched.skills && errors.skills}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            // onClick={uploadFile}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
