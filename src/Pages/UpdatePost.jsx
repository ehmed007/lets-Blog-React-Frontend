import { useNavigate, useParams } from "react-router-dom";
import { loadOnePost, updatePost } from "../Services/post-service";
import React, { useEffect, useRef } from "react";
import Base from "../Components/Base";
import { getCurrentUserDetail, isLoggedIn } from "../Auth";
import { Box, Card, IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { BASE_URL } from "../Services/Helper";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { createPost, uploadPostImage } from "../Services/post-service";
import { loadAllCategories } from "../Services/category-service";

export default function UpdatePost() {

  const navigator = useNavigate()

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [postimage, setPostImage] = React.useState(null);
  const [category, setCategory] = React.useState("");
  const [check,setCheck] = React.useState(true)
  const [post,setPost] = React.useState("");

  const [categories, setCategories] = React.useState("");

  const editor = useRef(null);

  const { postId } = useParams();
  useEffect(() => {
    loadOnePost(postId)
      .then((response) => {
        setPost(response)
        setTitle(response.title);
        setContent(response.content);
        setCategory(response.categoryResponses?.id)
        console.log(response);
        setPostImage(BASE_URL + "/api/v1/getPostImage/" + response.imageUrl);

      })
      .catch((error) => {
        console.log(error);
      });

    loadAllCategories()
      .then((reponse) => {
        console.log(reponse);
        setCategories(reponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleImage(e) {
    setCheck(false)
    setPostImage(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      title: title,
      content: content,
    };
    updatePost(data, post.id, category)
      .then((response) => {
        if (!check) {
          uploadPostImage(postimage, response.id)
            .then((response) => {
              toast.success("Post Updated Successfully!");
              setTitle("");
              setContent("");
              setPostImage(null);
              navigator("/newfeed") 
            })
            .catch((error) => {
              toast.error("Image does not uploaded!");
            });
        } else {
          toast.success("Post Updated Successfully!");
          navigator("/newfeed")
        }
      })
      .catch((error) => {
        error.response.data.message.forEach((i) => {
          toast.error(i);
        });
      });

  }

  return (
    <Base>
      <div style={{ display: "grid", justifyItems: "center" }}>
        <Box sx={{ marginTop: "80px", minWidth: "800px", maxWidth: "650px" }}>
          <Typography variant="h3" sx={{ textAlign: "center", color: "green" }}>
            <b>Edit Post!</b>
          </Typography>
          <Card>
          <Form style={{ margin: "20px" }} onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="title">
                <h3 style={{ color: "green" }}>Title :</h3>
              </Label>
              <Input
                required
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                style={{ height: "50px" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">
                <h3 style={{ color: "green" }}>Description :</h3>
              </Label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </FormGroup>            
            
            {
                check?
                postimage ? (
                    <img
                      style={{
                        width: "760px",
                        height: "400px",
                      }}
                      src={postimage}
                      srcSet=""
                    />
                  ) : (
                    <div></div>
                  )
                  :
                  postimage ? (
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
                  )
            }

            

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
              <Input
                id="exampleSelect"
                name="select"
                onChange={(e) => setCategory(e.target.value)}
                type="select"
              >
                <option value={""}>Select</option>
                {categories
                  ? categories?.map((i) => {
                      return (
                        <option selected={
                          i.id == category ?
                          true
                          :false
                        } value={i.id}>{i.category}</option>
                      )  
                    })
                  : ""}
              </Input>
            </FormGroup>

            <Button type="submit" color="success">Update Post</Button>
          </Form>
          </Card>
        </Box>
      </div>
    </Base>
  );
}
