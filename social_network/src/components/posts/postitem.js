import React, { useState, Fragment } from "react";
import {Link} from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Moment from "react-moment";
import moment from "moment";
import { AddLike, RemoveLike,AddComment } from "../../actions/post";
import Comments from './comments'
import "./post.css";

function Postitem({
  AddLike,
  RemoveLike,
  AddComment,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) {

  const [comment, setcomment] = useState("");

  const ToggleCommentForm = () => {
    document.getElementById(_id).classList.toggle("Comment_Field");
  };
  const ToggleCommentField = () => {
    let commentid = `comment${_id}`
    document.getElementById(commentid).classList.toggle("Comment_Field");
  };
  return (
    <Fragment>
      <div className="post">
        {/* <h3>{name}</h3> */}
        <Link className="Link" to={`/profile/${user}`}>
        <h3 className="post_user">{name}</h3>
        </Link>
        <p className="post_date"> <Moment format="YYYY/MM/DD">{moment.utc(date)}</Moment></p>
        <div className="post_text">
        <p>{text}</p>
        </div>
        {/* <h4>
          <Moment format="YYYY/MM/DD">{moment.utc(date)}</Moment>
        </h4> */}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => AddLike(_id)}
        >
          <ThumbUpAltIcon />
        </IconButton>
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => RemoveLike(_id)}
        >
          <ThumbDownIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={()=>ToggleCommentField()}
        >
          <i className="fas fa-comment"></i>
        </IconButton>
        <Chip
          label="+ comment"
          size="small"
          color="primary"
          // className={_id}
          onClick={() => ToggleCommentForm()}
        />
      </div>
      <div id={_id} className="Comment_Field">
        <form   onSubmit={(e) => {
              e.preventDefault();
              AddComment(_id,{ text:comment });
              setcomment('')
              ToggleCommentForm()
            }}>
          <TextField
            label="your comment"
            fullWidth
            multiline
            variant="filled"
            value={comment}
            onChange={(e) => {
              setcomment(e.target.value);
            }}
            // id={_id}
            // onChange={(e) => {
            //   settext(e.target.value);
            // }}
          />
          <button type="submit" className="Submit_Comment">Add</button>
        </form>
      </div>
     <div id={`comment${_id}`} className="Comment_Field comments">
       {
         comments.map(comment => (
          <Comments key={comment._id} user={user} postid={_id} comment={comment}/>
         ))
       }
     </div>
    </Fragment>
  );
}

Postitem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  AddLike: PropTypes.func.isRequired,
  AddComment: PropTypes.func.isRequired,
  RemoveLike: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { AddLike, RemoveLike, AddComment })(Postitem);
