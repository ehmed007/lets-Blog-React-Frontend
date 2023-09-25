import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { Button, Card, ListGroup, ListGroupItem } from "reactstrap";
import Base from "../Components/Base";
import Post from "../Components/Post";
import { deletePost, loadAllPost, loadAllPostByCategoryId } from "../Services/post-service";
import { isLoggedIn } from "../Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllCategories } from "../Services/category-service";

export default function Newfeed() {
  const navigator = useNavigate();
  const [postContent, setPostContent] = React.useState({
    message: [],
    result: false,
  });

  const [categories, setCategories] = React.useState("");

  useEffect(() => {
    loadAllCategories()
      .then((reponse) => {
        console.log(reponse);
        setCategories(reponse);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchData();
  }, []);

  const fetchData = () => {
    loadAllPost()
      .then((data) => {
        console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (e, postId) => {
    e.preventDefault();
    if (isLoggedIn()) {
      deletePost(postId)
        .then((reponse) => {
          toast.success("Blog deleted Successfully!");
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigator("/login");
    }
  };

  const categoryFilter = (e,category) => {
    e.preventDefault()

    loadAllPostByCategoryId(category).then((data) => {
      console.log(data);
      setPostContent(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <Base>
      <div
        style={{
          marginTop: "75px",
          display: "grid",
          gridTemplateColumns: "1.3fr 4fr 1.3fr",
          gap: "2px",
        }}
      >
        <div style={{ margin: "2px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.5fr 2fr",
              gap: "2px",
            }}
          >

            <div style={{position:"fixed",marginLeft:"37px"}} >
              <Card
                style={{
                  margin: "3px",
                  display: "grid",
                  justifyItems: "center",
                  justifySelf:"center",
                  backgroundColor: "#349e39",
                  width:"250px"
                }}
              >
                <h3 style={{ margin: "5px", color: "white"}}>Categories</h3>
              </Card>

              <div style={{ margin: "2px", color: "white" }}>
                <ListGroup style={{textAlign:"center"}} >
                <ListGroupItem action={true} onClick={fetchData} >All Categories</ListGroupItem>
                  {categories
                    ? categories?.map((i) => {
                        return <ListGroupItem action={true} onClick={(e) => categoryFilter(e,i.id)} >{i.category}</ListGroupItem>;
                      })
                    : ""}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>

        <div style={{ margin: "2px" }}>
          <Card
            style={{
              margin: "3px",
              display: "grid",
              justifyItems: "center",
              backgroundColor: "#349e39",
            }}
          >
            <h3 style={{ margin: "5px", color: "white" }}>New Feed</h3>
          </Card>

          {postContent.message[0] ? (
            postContent.message.map((i) => {
              return <Post post={i} handleDelete={handleDelete} key={i.id} />;
            })
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
        </div>

        <div style={{ margin: "2px" }}></div>
      </div>
    </Base>
  );
}
