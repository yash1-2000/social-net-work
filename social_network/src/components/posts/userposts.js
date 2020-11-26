import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import "./post.css";
import { GetUserPosts, CreatePost } from "../../actions/post";
import Userpost from "./userpost";

function Userposts({ auth, GetUserPosts, userposts, CreatePost }) {
  useEffect(() => {
    GetUserPosts(auth.user._id);
  }, [GetUserPosts]);

  const [text, settext] = useState("");

  return (
    <Fragment>
      <div className="main_container">
        <div className="Card">
          <h2 className="title">add new post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              CreatePost({ text });
              settext('')
            }}
            className="Post_Form"
          >
            <TextField
              id="outlined-multiline-static"
              label="your post"
              className="TextField"
              fullWidth
              multiline
              value={text}
              variant="filled"
              onChange={(e) => {
                settext(e.target.value);
              }}
            />
             <div className="Publish_Button">
            <Button
              type='submit'
              size="small"
              variant="contained"
              color="primary"
            >
              publish
            </Button>
          </div>
          </form>
        </div>
        <div>
          {userposts.map((post) => (
            <Userpost key={post._id} post={post} />
            // <h1 key={post._id}>{post.name}</h1>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

Userposts.propTypes = {
  auth: PropTypes.object.isRequired,
  userposts: PropTypes.array.isRequired,
  GetUserPosts: PropTypes.func.isRequired,
  CreatePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  userposts: state.post.userposts,
});

export default connect(mapStateToProps, { GetUserPosts, CreatePost })(Userposts);
