const initialState = {
  accessToken: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOADING": 
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_DONE": 
      return {
        ...state,
        isLoading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        isAuthenticated: true, 
        error: null, 
        isLoading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        accessToken: null, 
        isAuthenticated: false, 
        error: action.payload, 
        isLoading: false,
      };
    case "SET_AUTH":
      return {
        ...state,
        accessToken: action.payload.accessToken, 
        isAuthenticated: true, 
        error: null, 
        isLoading: false,
      };
    // case "SET_ACCESS_TOKEN":
    //   return { ...state, 
    //     accessToken: action.payload 
    //   };
    case "LOGOUT":
      return {
        ...state,
        accessToken: null, 
        isAuthenticated: false, 
        error: null, 
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
