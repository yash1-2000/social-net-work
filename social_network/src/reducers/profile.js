import {GET_CURRENT_PROFILE,UPDATE_PROFILE,PROFILE_ERROR,CLEAR_CURRENT_PROFILE, GET_PROFILES, GET_REPOS,GITHUB_ACCOUNT} from "../actions/types";

const initialState = {
    profile:null,
    profiles:[],
    repos:[],
    loading:[],
    error:{},
    profilepic:"",
    githubaccount:false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_PROFILE:
    case UPDATE_PROFILE:
      return {
          ...state,
          profile:payload,
          loading:false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles:payload,
        loading:false
      }
    case CLEAR_CURRENT_PROFILE:
      return{
        ...state,
        profile:null,
        repos:[],
        loading:false
      }
    case PROFILE_ERROR:
        return {
            ...state,
            error:payload,
            loading:false,
            profile: null
        };
    case GET_REPOS:
      return {
        ...state,
        repos:payload,
        loading:false,
        githubaccount:true
      }
    case GITHUB_ACCOUNT:
      return{
        ...state,
        loading:false,
        githubaccount:false
      }
    default:
      return state;
  }
}