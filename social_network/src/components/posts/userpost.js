import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Comments from "./comments";
import "./post.css";
import { DeletePost } from "../../actions/post";

function Userpost({ post, DeletePost }) {

  const ToggleCommentField = () => {
    let commentid = `comment${post._id}`
    document.getElementById(commentid).classList.toggle("Comment_Field");
  };
  
  return (
    <Fragment>
      <div className="UserPosts">
        <div key={post._id}>
          <div className="post">
            <h3 className="post_user">{post.name}</h3><p className="post_date"> <Moment format="YYYY/MM/DD">{moment.utc(post.date)}</Moment></p>
            <p>{post.text}</p>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ThumbUpAltIcon />
            </IconButton>
            <span>
              {post.likes.length > 0 && <span>{post.likes.length}</span>}
            </span>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={()=>ToggleCommentField()}
            >
              <i className="fas fa-comment"></i>
            </IconButton>

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => DeletePost(post._id)}
            >
              <i className="fas fa-trash"></i>
            </IconButton>
          </div>
        </div>
      </div>
      <div id={`comment${post._id}`} className="Comment_Field comments">
        {post.comments.map((comment) => (
          <Comments
            key={comment._id}
            user={post.user}
            postid={post._id}
            comment={comment}
          />
        ))}
      </div>
    </Fragment>
  );
}

Userpost.propTypes = {
  post: PropTypes.object.isRequired,
  DeletePost: PropTypes.func.isRequired,
};

export default connect(null, { DeletePost })(Userpost);
