import React,{useEffect,Fragment} from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {GetPosts} from '../../actions/post'
import Spinner from '../layout/spinner'
import Postitem from './postitem'

function Posts({GetPosts,post:{posts,loading}}) {
    useEffect(() => {
        GetPosts();
      }, [GetPosts]);
    return loading ? <Spinner/> : (<Fragment>
      <div className="main_container">
      <h1 style={{margin:"5px 0", fontFamily:"Roboto, sans-serif"}}>posts</h1>
      {/* post form */}
      <div className="posts">
        {
          posts.map(post=>(
            <Postitem key={post._id} post={post}/>
          ))
        }
      </div>
      </div>
    </Fragment>)
}


Posts.propTypes = {
    GetPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
  };
  const mapStateToProps = (state) => ({
   post:state.post
  });

export default connect(mapStateToProps,{GetPosts})(Posts)
