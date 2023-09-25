import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardText } from "reactstrap";
import { BASE_URL } from "../Services/Helper";
import { Link } from "react-router-dom";
import { getCurrentUserDetail } from "../Auth";

export default function Post(props) {
  const [postOwner, setPostOwnner] = useState(false);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  useEffect(() => {
    let user = getCurrentUserDetail();
    console.log(user)
    if (user && props.post) {
      if (user?.username == props.post?.userResponse?.username) {
        setPostOwnner(true);
      }
    }
  }, []);

  return (
    <Card style={{ margin: "3px" }}>
      <CardBody>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            style={{ height: "200px", minWidth: "400px", marginRight: "20px" }}
            src={BASE_URL + "/api/v1/getPostImage/" + props.post?.imageUrl}
            alt=""
            srcSet=""
          />
          <CardText>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconButton sx={{ p: 0, marginRight: "20px" }}>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  src={
                    BASE_URL +
                    "/auth/getUserImage/" +
                    props.post?.userResponse?.imageUrl
                  }
                />
              </IconButton>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "5px",
                }}
              >
                <b>{props.post?.userResponse?.username?.toUpperCase() + " "}</b>
                <div style={{ fontSize: "13px" }}>
                  Posted on <b>{new Date(props.post?.date).getDate()}</b> {" "}
                  <b>{months[new Date(props.post?.date).getMonth()]}</b> {" "}
                  <b>{new Date(props.post?.date).getFullYear()}</b>{" at "}
                  <b>{new Date(props.post?.date).getHours()}</b>{":"}
                  <b>{new Date(props.post?.date).getMinutes()}</b>{":"}
                  <b>{new Date(props.post?.date).getSeconds()}</b>
                </div>
              </span>
            </div>

            <h2 style={{ color: "green", maxWidth: "400px", marginTop: "5px" }}>
              {props.post?.title?.slice(0, 50)}
            </h2>

            <Link
              className="btn btn-success m-1"
              to={"/postpage/" + props.post?.id}
            >
              Read More
            </Link>

            {postOwner ? (
              <Link
                className="btn btn-danger m-1"
                onClick={(e) => props.handleDelete(e, props.post?.id)}
              >
                Delete Post
              </Link>
            ) : (
              ""
            )}
            {postOwner ? (
              <Link
                className="btn btn-warning m-1"
                to={`/updatepost/${props.post?.id}`}
              >
                Update
              </Link>
            ) : (
              ""
            )}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
}
