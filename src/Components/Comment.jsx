import React, { useEffect } from "react";

import Base from "../Components/Base";
import { Avatar, Box, Button, IconButton, TextField } from "@mui/material";
import { Form, Link, useParams } from "react-router-dom";
import { Card, CardBody, CardText, Col, Row } from "reactstrap";
import SendIcon from "@mui/icons-material/Send";
import { loadOnePost } from "../Services/post-service";
import { BASE_URL } from "../Services/Helper";
import { doComment } from "../Services/comment-service";
import { getCurrentUserDetail } from "../Auth";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Comment from "../Components/Comment";

export default function CommentCard(props) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [user, setUser] = React.useState("");

  useEffect(() => {
    let user = getCurrentUserDetail();
    setUser(user);
  }, []);

  return (
    <div key={props.comment.id}>
      <Card style={{ marginRight: "5px", margin: "10px" }}>
        <CardBody>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton sx={{ p: 0, marginRight: "20px" }}>
              <Avatar
                sx={{ width: 44, height: 44 }}
                src={
                  BASE_URL +
                  "/auth/getUserImage/" +
                  props.comment?.userResponse?.imageUrl
                }
              />
            </IconButton>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "4fr 1fr",
                gap: "20px",
              }}
            >
              <div >
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "15px",
                  }}
                >
                  <b style={{ width: "150px" }}>
                    {props.comment?.userResponse?.username.toUpperCase() + " "}
                  </b>

                  <div style={{ fontSize: "13px" }}>
                    Posted on <b>{new Date(props.comment?.date).getDate()}</b>{" "}
                    <b>{months[new Date(props.comment?.date).getMonth()]}</b>{" "}
                    <b>{new Date(props.comment?.date).getFullYear()}</b>
                    {" at "}
                    <b>{new Date(props.comment?.date).getHours()}</b>
                    {":"}
                    <b>{new Date(props.comment?.date).getMinutes()}</b>
                    {":"}
                    <b>{new Date(props.comment?.date).getSeconds()}</b>
                  </div>
                </span>
              </div>

              <div >
                <div style={{marginLeft:"20px"}} >
                  {user?.username == props.comment?.userResponse?.username ? (
                    <IconButton
                      onClick={(e) =>
                        props.handleDeleteComment(e, props.comment.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>

        <CardText
          style={{
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              marginLeft: "80px",
              marginBottom: "20px",
              marginTop: "-10px",
            }}
          >
            <h4>
              <b style={{ color: "green" }}>{props.comment.comment}</b>
            </h4>
          </div>
        </CardText>
      </Card>
    </div>
  );
}
