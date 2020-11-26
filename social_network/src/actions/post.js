import axios from "axios";
import { DELETE_POST, GET_POSTS, POST_ERROR,UPDATE_LIKES, GET_USER_POSTS, ADD_POST, ADD_COMMENT, REMOVE_COMMENT } from "./types";
import url from "../api"

// get posts
export const GetPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    // const res = await axios.get(`${url}/api/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get user posts
export const GetUserPosts = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/user/${id}`);
    // const res = await axios.get(`${url}/api/posts/user/${id}`);
    dispatch({
      type: GET_USER_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add post
export const CreatePost = FormData => async dispatch => {
  try {
    const config = {
      headers:{'Content-Type': 'application/json'}
    }

    const res = await axios.post(`/api/posts`,FormData,config);
    // const res = await axios.post(`${url}/api/posts`,FormData,config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete post
export const DeletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    // await axios.delete(`${url}/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (err) {
  
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// add like
export const AddLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    // const res = await axios.put(`${url}/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const RemoveLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    // const res = await axios.put(`${url}/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
  
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// add comment
export const AddComment = (postid,FormData) => async dispatch => {
  try {
    const config = {
      headers:{'Content-Type': 'application/json'}
    }

    const res = await axios.put(`/api/posts/comment/${postid}`,FormData,config);
    // const res = await axios.put(`${url}/api/posts/comment/${postid}`,FormData,config);
    dispatch({
      type: ADD_COMMENT,
      payload: {postid:postid
        ,comments:res.data},
    });
  } catch (err) {
    console.log(err)
    // dispatch({
    //   type: POST_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

// remove comment
export const RemoveComment = (postid,commentid) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postid}/${commentid}`);
    // await axios.delete(`${url}/api/posts/comment/${postid}/${commentid}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload:{ postid:postid,commentid:commentid},
    });
  } catch (err) {
    console.log(err.response)
    // dispatch({
    //   type: POST_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};