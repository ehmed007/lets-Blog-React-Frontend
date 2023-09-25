import React, { useEffect } from "react";
import Base from "../Components/Base";
import AddPost from "./AddPost";
import { Card, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { getOneUser } from "../Services/user-service";
import { getCurrentUserDetail } from "../Auth";
import { deletePost } from "../Services/post-service";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [user, setUser] = React.useState("");

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    getOneUser(getCurrentUserDetail().id)
      .then((response) => {
        setUser(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const callMethod = () => {
    loadUser();
  }

  const removePost = (e,postId) => {
    e.preventDefault();
    deletePost(postId).then((response) => {
        toast.success("Post deleted Successfully!")
        loadUser()
    }).catch((error) => {
        toast.error("Post does not deleted!")
    })
  }

  return (
    <Base>
      <div
        style={{
          marginTop: "70px",
          display: "grid",
          gridTemplateColumns: "4fr 2.3fr",
          gap: "2px",
        }}
      >
        <div>
          <AddPost callMethod={callMethod} />
        </div>
        <div style={{ margin: "5px", marginTop: "10px" }}>
          <div
            style={{
              backgroundColor: "#349e39",
              color: "white",
              textAlign: "center",
              borderRadius: "5px",
            }}
          >
            {" "}
            <h3 style={{ padding: "8px" }}>Your Recent Posts</h3>{" "}
          </div>

          {user?.posts?.map((i) => {
            return (
              <Card style={{ padding: "10px", marginBottom: "3px" }}>
                <CardText>
                  <div style={{ display: "flex", flexDirection: "row" }}></div>

                  <h4
                    style={{
                      color: "green",
                      maxWidth: "400px",
                      marginTop: "5px",
                    }}
                  >
                    {i?.title?.slice(0, 50)}
                  </h4>

                  <Link
                    className="btn btn-success m-1"
                    to={"/postpage/" + i?.id}
                  >
                    Read More
                  </Link>
                    <Link
                      className="btn btn-danger m-1"
                        onClick={(e) => removePost(e,i?.id)}
                      >
                      Delete Post
                    </Link>
                    <Link
                      className="btn btn-warning m-1"
                      to={"/updatepost/"+i.id}
                    >
                      Update
                    </Link>
                </CardText>
              </Card>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
