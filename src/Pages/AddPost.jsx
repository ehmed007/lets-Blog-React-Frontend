import React, { useEffect, useRef } from "react";
import Base from "../Components/Base";
import { getCurrentUserDetail, isLoggedIn } from "../Auth";
import { Box, Card, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { BASE_URL } from "../Services/Helper";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { createPost, uploadPostImage } from "../Services/post-service";
import { loadAllCategories } from "../Services/category-service";

export default function AddPost(props) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [postimage, setPostImage] = React.useState(null);
  const [category, setCategory] = React.useState("");

  const [userimage, setUserImage] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [categories,setCategories] = React.useState("");

  const editor = useRef(null);

  React.useEffect(() => {
    loadAllCategories().then((reponse) => {
      console.log(reponse)
      setCategories(reponse);
    }).catch((error) => {
      console.log(error)
    })


    setLoggedIn(isLoggedIn());
    if (isLoggedIn()) {
      let user = getCurrentUserDetail();
      setUserImage(BASE_URL + "/auth/getUserImage/" + user.imageUrl);
    }
  }, []);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (postimage == null) {
      toast.error("Please upload image!");
      return;
    }

    if (category == "") {
      toast.error("Please select category!");
      return;
    }
    console.log(category)
    let data = {
      title: title,
      content: content,
    };
    let user = getCurrentUserDetail();
    createPost(data, user.id, category)
      .then((response) => {
        uploadPostImage(postimage, response.id)
          .then((response) => {
            props.callMethod()
            toast.success("Post Created Successfully!");
            setTitle("");
            setContent("");
            setPostImage(null);
          })
          .catch((error) => {
            toast.error("Image does not uploaded!");
          });
      })
      .catch((error) => {
        error.response.data.message.forEach((i) => {
          toast.error(i);
        });
      });
  }


  function reset(e) {
    setTitle("");
    setContent("");
    setPostImage("");
  }

  function handleImage(e) {
    setPostImage(e.target.files[0]);
  }

  return (
    <Base>
      <div style={{ display: "grid", margin:"5px",marginTop:"10px"}}>
          <Card>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <IconButton sx={{ marginRight: "20px", marginLeft: "20px" }}>
                <Avatar src={userimage} sx={{ width: 56, height: 56 }} />
              </IconButton>
              <h2 style={{ color: "green", marginBottom: "15px" }}>
                What's going in your mind?
              </h2>
            </Box>
            <Form style={{ margin: "20px" }} onSubmit={(e) => handleSubmit(e)}>
              <FormGroup>
                {/* <Label for="title">
                  <h3 style={{ color: "green" }}>Title :</h3>
                </Label> */}
                <Input
                  required
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                  style={{ height: "50px" }}
                  value={title}
                  onChange={handleTitle}
                />
              </FormGroup>

              <FormGroup>
                {/* <Label for="description">
                  <h3 style={{ color: "green" }}>Description :</h3>
                </Label> */}
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                />
              </FormGroup>

              {postimage ? (
                <img
                  style={{
                    width: "760px",
                    height: "400px",
                  }}
                  src={URL.createObjectURL(postimage)}
                  srcSet=""
                />
              ) : (
                <div></div>
              )}

              <FormGroup>
                <Label for="image">
                  <h3 style={{ color: "green" }}>Image :</h3>
                </Label>
                <Input
                  id="image"
                  name="image"
                  onChange={handleImage}
                  type="file"
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect">
                  <h3 style={{ color: "green" }}>Categories</h3>
                </Label>
                <Input id="exampleSelect" name="select" onChange={(e) => setCategory(e.target.value)} type="select">
                  <option value={""} >Select</option>
                  
                  {
                    categories?
                    categories?.map((i) => {
                      return  <option value={i.id} >{i.category}</option>
                    })
                    :""
                  }
                  
                </Input>
              </FormGroup>

              <Button color="success">Create Post</Button>
              <Button color="danger" className="m-2" onClick={reset}>
                Reset Content
              </Button>
            </Form>
          </Card>
      </div>
    </Base>
  );
}
