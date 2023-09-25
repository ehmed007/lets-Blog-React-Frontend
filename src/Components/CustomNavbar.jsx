import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

import { doLogout, getCurrentUserDetail, isLoggedIn } from "../Auth";

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Services/Helper";

const pages = ["Home", "Signup", "Login"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [image, setImage] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const navigator = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    setLoggedIn(isLoggedIn());
    if (loggedIn) {
      let user = getCurrentUserDetail();
      setUserId(user.id)
      setImage(BASE_URL + "/auth/getUserImage/" + user.imageUrl);
      setName(user.firstname + " " + user.lastname);
    }
  });

  function logout() {
    doLogout(() => {
      navigator("/login");
    });
  }

  return (
    <AppBar color="success" position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigator("/")}
            onhov
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 1000,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              ":hover":{
                cursor:"pointer"
              }
            }}
          >
            Lets BLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
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
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page.toLowerCase() == "home") {
                        navigator("/");
                      } else {
                        navigator("/" + page.toLowerCase());
                      }
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

            <Button
              onClick={() => navigator("/newfeed")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              New Feed
            </Button>
            <Button
              onClick={() => navigator("/")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
            <Button
              onClick={() => navigator("/")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Services
            </Button>
            {loggedIn ? (
              ""
            ) : (
              <>
                <Button
                  onClick={() => navigator("/signup")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Signup
                </Button>
                <Button
                  onClick={() => navigator("/login")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              </>
            )}

            {loggedIn ? (
              <>
                <Button
                  onClick={() => navigator("/user/dashboard")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Dashboard
                </Button>
              </>
            ) : (
              ""
            )}
          </Box>

          {loggedIn ? (
            <Typography variant="h7" sx={{ marginRight: "10px" }}>
              {name.toUpperCase()}
            </Typography>
          ) : (
            ""
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {loggedIn ? <Avatar src={image} /> : ""}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                  <Typography textAlign="center" onClick={() => navigator("/userinfo/"+userId)} >
                    User Profile
                  </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center" onClick={logout}>
                  Logout User
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
