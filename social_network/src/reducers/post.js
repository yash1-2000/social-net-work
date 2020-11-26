import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  GET_USER_POSTS,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  userposts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        userposts: [payload, ...state.userposts],
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts:state.posts.map((post)=>
        post._id === payload.postid ? { ...post, comments: payload.comments } : post
        ),
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        posts:state.posts.map(post => post._id === payload.postid ? { ...post,comments:post.comments.filter(comment => comment._id !== payload.commentid)} : post),
        loading:false
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userposts: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        userposts: state.userposts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
