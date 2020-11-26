import React,{Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {RemoveComment} from '../../actions/post'

function Comments({comment,auth,user,RemoveComment,postid }) {
    return (
        <Fragment>
          <div className="comment_block">
          <h5>{comment.name}</h5>
            {/* <p>{comment.text}  {(!auth.loading && user === auth.user._id) || (comment.user === auth.user._id) && (<IconButton */}
            <p style={{textAlign:"justify"}}>{comment.text}  { (comment.user === auth.user._id) ? (
            // <IconButton
            //       color="primary"
            //       aria-label="upload picture"
            //       component="span"
            //      onClick={()=>RemoveComment(postid,comment._id)}
            //     >
            //      <HighlightOffIcon/>
            //     </IconButton>
            <strong style={{color:"red",cursor:"pointer",fontSize:"20px"}} onClick={()=>RemoveComment(postid,comment._id)}>x</strong>
                ) : null} </p>
          </div>
        </Fragment>
    )
}


Comments.propTypes = {
    postid:PropTypes.string.isRequired,
    RemoveComment:PropTypes.func.isRequired,
    comment:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
  };
  const mapStateToProps = (state) => ({
    auth:state.auth
  });

export default connect( mapStateToProps, {RemoveComment })(Comments)
