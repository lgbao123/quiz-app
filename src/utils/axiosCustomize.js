
import axios from "axios";
import nProgress from "nprogress";
import { store } from '../redux/store'
nProgress.configure({ showSpinner: false, speed: 1000 });
const instance = axios.create({
   baseURL: 'http://localhost:8000/'
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
   // Do something before request is sent
   nProgress.start();
   const token = store?.getState()?.user?.account?.access_token
   if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
   }
   // console.log(store);
   return config;
}, function (error) {
   // Do something with request error
   return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
   // Any status code that lie within the range of 2xx cause this function to trigger
   // Do something with response data
   // console.log(response);
   nProgress.done();
   return response && response.data ? response.data : response;
}, function (error) {
   nProgress.done();
   // Any status codes that falls outside the range of 2xx cause this function to trigger
   // Do something with response error
   return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance