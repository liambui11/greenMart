const initialState = {
  accessToken: null,
  isAuthenticated: false,
  // user: null, 
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        // user: action.payload.info, 
        isAuthenticated: true, 
        error: null, 
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        accessToken: null, 
        isAuthenticated: false, 
        error: action.payload, 
      };
    case "SET_AUTH":
      return {
        ...state,
        accessToken: action.payload.accessToken, 
        isAuthenticated: true, 
        error: null, 
      };
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "LOGOUT":
      return {
        ...state,
        accessToken: null, 
        isAuthenticated: false, 
        // user: null, 
        error: null, 
      };
    default:
      return state;
  }
};

export default authReducer;
