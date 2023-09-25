import React, { useEffect } from "react";
import Base from "../Components/Base";
import { Avatar, Box, Button, IconButton, TextField } from "@mui/material";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardText, Col, Row } from "reactstrap";
import SendIcon from "@mui/icons-material/Send";
import { loadOnePost } from "../Services/post-service";
import { BASE_URL } from "../Services/Helper";
import { deleteComment, doComment } from "../Services/comment-service";
import { getCurrentUserDetail, isLoggedIn } from "../Auth";
import { toast } from "react-toastify";
import Comment from "../Components/Comment";

export default function SampleNewFeed() {
  const navigator = useNavigate()
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);
  const [comment, setComment] = React.useState("");
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

  useEffect(() => {
    loadPost();
  }, []);

  function loadPost() {
    loadOnePost(postId)
      .then((response) => {
        console.log(response);
        setPost(response);
      })
      .catch((error) => {
        setPost(null);
      });
  }

  function handleComment(e) {
    if (isLoggedIn()) {
      e.preventDefault();
      let user = getCurrentUserDetail();
      let data = {
        comment: comment,
      };
      doComment(data, post?.id, user.id)
        .then((response) => {
          console.log(response);
          setComment("");
          toast.success("Comment added Successfully!");
          loadPost();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigator("/login")
    }
  }

  const handleDeleteComment = (e, commentId) => {
    e.preventDefault();

    deleteComment(commentId).then((reponse) => {
      toast.success("Comment deleted Successfully!")
      loadPost()
    }).catch((error) => {
      toast.error("Comment does not deleted!")
      console.log("error")
    })
  }

  return (
    <Base>
      <div
        style={{
          marginTop: "70px",
          display: "grid",
          gridTemplateColumns: "4fr 1.7fr",
          gap: "2px",
        }}
      >

        <div style={{}}>
          {post ? (
            <div
              style={{
                display: "grid",
                justifyItems: "center",
              }}
            >
              <Box sx={{ margin: "10px", marginTop: "10px" }}>
                <Link to="/" style={{ marginLeft: "10px", marginTop: "20px" }}>
                  Home
                </Link>{" "}
                / <Link> {post?.title}</Link>
                <Row>
                  <Col md={{ size: 12 }}>
                    <Card className="mt-2" style={{minWidth:"1030px"}} >
                      <CardBody>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <IconButton sx={{ p: 0, marginRight: "20px" }}>
                            <Avatar
                              sx={{ width: 56, height: 56 }}
                              src={
                                BASE_URL +
                                "/auth/getUserImage/" +
                                post?.userResponse?.imageUrl
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
                            <b>
                              {post?.userResponse?.username.toUpperCase() + " "}
                            </b>

                            <div style={{ fontSize: "13px" }}>
                              Posted on <b>{new Date(post?.date).getDate()}</b>{" "}
                              <b>{months[new Date(post?.date).getMonth()]}</b>{" "}
                              <b>{new Date(post?.date).getFullYear()}</b>
                              {" at "}
                              <b>{new Date(post?.date).getHours()}</b>
                              {":"}
                              <b>{new Date(post?.date).getMinutes()}</b>
                              {":"}
                              <b>{new Date(post?.date).getSeconds()}</b>
                            </div>
                          </span>
                        </div>

                        <CardText>
                          <h1 style={{ marginTop: "20px" }}>
                            <b>{post?.title}</b>
                          </h1>
                          <CardText
                            style={{ minWidth: "500px" }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          ></CardText>
                        </CardText>

                        <div className="image-container">
                          <img
                            style={{ width: "100%" }}
                            src={
                              BASE_URL +
                              "/api/v1/getPostImage/" +
                              post?.imageUrl
                            }
                            alt=""
                            srcSet=""
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Box>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  marginTop: "70px",
                  justifyItems: "center",
                }}
              >
                <Box
                  sx={{
                    marginTop: "10px",
                    minWidth: "850px",
                    maxWidth: "650px",
                    textAlign: "center",
                  }}
                >
                  <h1 style={{ marginTop: "80px", color: "red" }}>
                    OOPS! No post available!
                  </h1>
                </Box>
              </div>
            </>
          )}

          <div
            style={{
              display: "grid",
              marginTop: "20px",
              justifyItems: "center",
            }}
          >
            <Box
              sx={{ marginTop: "10px", minWidth: "830px", maxWidth: "650px" }}
            ></Box>
          </div>

          <br />
          <br />
        </div>

        <div style={{ marginTop: "31px"}}>
          <form onSubmit={handleComment}>
            <TextField
              required
              fullWidth
              label="Write a Comment"
              id="fullWidth"
              variant="standard"
              color="success"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{ margin: "13px", width: "360px" }}
            />

            <Button
              style={{ marginTop: "23px", marginLeft: "-10px" }}
              type="submit"
            >
              <SendIcon color="success" />
            </Button>
          </form>

          <div>
            {post?.commentResponses.map((i) => {
              return (
                <Comment comment={i} handleDeleteComment={handleDeleteComment} />
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
}
