import React, { useEffect } from "react";
import { getOneUser } from "../Services/user-service";
import { useParams } from "react-router-dom";
import Base from "../Components/Base";
import { Card, Col, Table } from "reactstrap";
import { Typography } from "@mui/material";
import { BASE_URL } from "../Services/Helper";

export default function UserInfo() {
  const { userId } = useParams();

  const [user, setUser] = React.useState("");
  const [userImage, setUserImage] = React.useState("");

  useEffect(() => {
    getOneUser(userId)
      .then((response) => {
        setUser(response);
        setUserImage(BASE_URL + "/auth/getUserImage/" + response.imageUrl);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Base>
      <div
        style={{
          marginTop: "80px",
          display: "grid",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" color={"#349e39"}>
          <b>User Profile</b>
        </Typography>

        <Card
          style={{
            padding: "10px",
            minWidth: "800px",
            display: "grid",
            justifyContent: "center",
          }}
        >
          <div>
            {userImage ? (
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "80px",
                }}
                src={userImage}
                srcSet=""
              />
            ) : (
              <div></div>
            )}
          </div>
          <div style={{backgroundColor:"#349e39", borderRadius:"5px", marginBottom:"10px", marginTop:"10px"}} >
            <h2 style={{color:"white",margin:"2px"}}>User Information</h2>
          </div>
          <div>
            <Table striped hover responsive bordered>
              <tbody>
                <tr>
                  <th style={{width:"400px"}} >User ID</th>
                  <td style={{width:"400px",backgroundColor:"grey",color:"white"}} >{user.id}</td>
                </tr>
                <tr>
                  <th style={{width:"400px"}} >Username</th>
                  <td style={{width:"400px",backgroundColor:"grey",color:"white"}} >{user.username?.toUpperCase()}</td>
                </tr>
                <tr>
                  <th style={{width:"400px"}} >Email</th>
                  <td style={{width:"400px",backgroundColor:"grey",color:"white"}} >{user.email?.toUpperCase()}</td>
                </tr>
                <tr>
                  <th style={{width:"400px"}} >First Name</th>
                  <td style={{width:"400px",backgroundColor:"grey",color:"white"}} >{user.firstname?.toUpperCase()}</td>
                </tr>
                <tr>
                  <th style={{width:"400px"}} >Last Name</th>
                  <td style={{width:"400px",backgroundColor:"grey",color:"white"}} >{user.lastname?.toUpperCase()}</td>
                </tr>
                <tr>
                  <th style={{width:"400px"}} >Gender</th>
                  <td style={{width:"400px",backgroundColor:"grey",color:"white"}} >{user.gender?.toUpperCase()}</td>
                </tr>
                <tr>
                  <th style={{width:"400px"}} >Number of Posts</th>
                  <td style={{width:"400px",backgroundColor:"grey",color:"white"}} >{user.posts?.length} Posts</td>
                </tr>
                <tr>
                  <th style={{width:"400px"}} >Number of Comments</th>
                  <td style={{width:"400px",backgroundColor:"grey",color:"white"}} >{user.comments?.length} Comments</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    </Base>
  );
}
