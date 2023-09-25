import React from "react";
import Base from "../Components/Base";
import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { signup, uploadUserImage, usernameExist } from "../Services/user-service";
import { toast } from "react-toastify";

export default function Signup() {
  const navigator = useNavigate();

  const [username,setUsername] = React.useState("")
  const [email,setEmail] = React.useState("")
  const [firstname,setFirstname] = React.useState("")
  const [lastname,setLastname] = React.useState("")
  const [gender,setGender] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [image, setImage] = React.useState(null);

  const [usernameError, setUsernameError] = React.useState("");
  const [usernameColor, setUsernameColor] = React.useState("success");


  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  function handleValue(e) {
    if (e.target.name == "Username") {
      setUsername(e.target.value)
    }
    if (e.target.name == "Firstname") {
      setFirstname(e.target.value)
    }
    if (e.target.name == "Lastname") {
      setLastname(e.target.value)
    }
    if (e.target.name == "Email") {
      setEmail(e.target.value)
    }
    if (e.target.name == "Gender") {
      setGender(e.target.value)
    }
    if (e.target.name == "Password") {
      setPassword(e.target.value)
    }
    if (e.target.name == "ConfirmPassword") {
      setConfirmPassword(e.target.value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (confirmPassword != password) {
      toast.error("Error! Password does not match!");
      return;
    }
    if (image == null) {
      toast.error("Error! please upload image!");
      return;
    }
    let data={
        "username":username,
        "email":email,
        "firstname":firstname,
        "lastname":lastname,
        "gender":gender,
        "password":password
      }
    signup(data)
      .then((response) => {
        uploadUserImage(image, response.id)
          .then((response) => {
            toast.success("Account Created Successfully!");
            setImage("")
            setPassword("")
            setConfirmPassword("")
            setUsername("")
            setEmail("")
            setFirstname("")
            setLastname("")
            setGender("")
            setUsernameError("")
            setUsernameColor("success")
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      })
      .catch((error) => {
          error.response.data.message.forEach((i) => {
            toast.error(i);
          });
      });
  }

  function handleUsername(e) {
    if (e.target.value.length >= 5) {
      usernameExist(e.target.value)
        .then((response) => {
          setUsernameError("Valid Username!");
          setUsername(e.target.value);
          setUsernameColor("success");
        })
        .catch((error) => {
          setUsernameError("Username already Taken!");
          setUsernameColor("error");
        });
      } else {
        setUsernameError("Username must be 5 characters!");
        setUsernameColor("error");
      }
    }

  return (
    <Base>
      <Container maxWidth="sm" style={{marginTop:"70px"}} >
        <br />
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack
            alignItems="center"
            sx={{
              border: "3px solid green",
              marginTop: "10px",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                paddingY: "30px",
                justifyContent: "center",
                color: "green",
              }}
            >
              <b>Register!</b>
            </Typography>
            {image ? (
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "80px",
                }}
                src={URL.createObjectURL(image)}
                srcSet=""
              />
            ) : (
              <div></div>
            )}
            <br />

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 0 }}
              textAlign={"center"}
            >
              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-required"
                  label="Username"
                  name="Username"
                  variant="outlined"
                  helperText={usernameError}
                  color={usernameColor}
                  value={username}
                  onChange={handleValue}
                  onKeyUp={handleUsername}
                /> 
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-required"
                  label="Email"
                  type="email"
                  name="Email"
                  value={email}
                  variant="outlined"
                  color="success"
                  onChange={handleValue}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-required"
                  label="Firstname"
                  variant="outlined"
                  color="success"
                  name="Firstname"
                  value={firstname}
                  onChange={handleValue}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-required"
                  label="Lastname"
                  variant="outlined"
                  color="success"
                  name="Lastname"
                  value={lastname}
                  onChange={handleValue}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-required"
                  label="Password"
                  variant="outlined"
                  color="success"
                  name="Password"
                  value={password}
                  onChange={handleValue}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-required"
                  label="Confirm Password"
                  variant="outlined"
                  color="success"
                  name="ConfirmPassword"
                  value={confirmPassword}
                  onChange={handleValue}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ width: "235px" }}>
                  <InputLabel id="demo-simple-select-label" color="success">
                    Gender *{" "}
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender *"
                    variant="outlined"
                    color="success"
                    value={gender}
                    name="Gender"
                    onChange={handleValue}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="success"
                  onChange={handleImage}
                  startIcon={<FileUploadIcon />}
                  sx={{ marginTop: "10px" }}
                  component="label"
                >
                  Upload Image
                  <input type="file" hidden />
                </Button>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              color="success"
              sx={{ margin: "30px" }}
              type="submit"
            >
              Signup
            </Button>
            <Link
              component="button"
              variant="body2"
              sx={{ color: "green" }}
              onClick={() => {
                navigator("/login");
              }}
            >
              Already have Account?
            </Link>
            <br />
            <br />
          </Stack>
        </form>
      </Container>
      <br />
      <br />
    </Base>
  );
}
