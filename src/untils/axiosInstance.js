import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "../redux/store";
import { checkAuth } from "../actions/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: true, 
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      const decodedToken = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decodedToken.exp < now) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            await store.dispatch(checkAuth());
            const newToken = store.getState().auth.accessToken;

            processQueue(null, newToken);

            config.headers.Authorization = `Bearer ${newToken}`;
            return config;
          } catch (err) {
            processQueue(err, null);
            throw err;
          } finally {
            isRefreshing = false;
          }
        } else {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                config.headers.Authorization = `Bearer ${token}`;
                resolve(config); 
              },
              reject: (err) => reject(err),
            });
          });
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && ( error.response.status === 401 || error.response.status === 403)) {
      store.dispatch({ type: 'LOGOUT' });
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
