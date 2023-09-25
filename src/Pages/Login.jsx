import React from "react";
import Base from "../Components/Base";
import {
  Button,
  Container,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "../Services/user-service";
import { toast } from "react-toastify";
import { doLogin, getCurrentUserDetail } from "../Auth";
import { BASE_URL } from "../Services/Helper";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [image, setImage] = React.useState("")

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if(username.length == 0) {
      toast.error("Username is required")
    }
    let data = {
      "username":username,
      "password":password
    }
    login(data).then((response) => {
      let data = {
        token:response.token,
        user:response.user
      }
      doLogin(data,()=> {
        let user = getCurrentUserDetail()
        setImage(BASE_URL+"/auth/getImage/"+user.imageUrl)
      })
      navigator("/user/dashboard")
      toast.success("Login Success!")
    }).catch((error) => {
      toast.error("Username or Password is Incorrect!")
    })
  }

  return (
    <Base>
      <Container sx={{marginTop:"60px", width: "600px", padding: "30px" }}>
        <br />
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack
            alignItems="center"
            sx={{
              border: "3px solid green",
              marginTop: "30px",
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
              <b>Login!</b>
            </Typography>
              
            <img src={image} alt="" />

            <TextField
              required
              id="filled-required"
              label="Username"
              // helperText="Username or password is Incorrect!"
              variant="outlined"
              color="success"
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                margin: "8px",
                width: "400px",
              }}
            />

            <FormControl sx={{ m: 1, width: "400px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" color="success">
                Password *
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                color="success"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              variant="contained"
              size="large"
              color="success"
              sx={{ margin: "30px" }}
              type="submit"
            >
              Login
            </Button>
            <Link
              component="button"
              variant="body2"
              sx={{ color: "green" }}
              onClick={() => {
                navigator("/signup");
              }}
            >
              Don't have Account?
            </Link>
            <br />
            <br />
          </Stack>
        </form>
      </Container>
    </Base>
  );
}
