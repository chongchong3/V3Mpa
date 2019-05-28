import axios from 'axios';
const BASEURL = "http://localhost:8080";
const TIMEOUT = 10000;
const GET = "get";
const POST = "post";
axios.defaults.transformRequest =[function(data){

}];
axios.defaults.baseURL = BASEURL;
axios.defaults.timeout = TIMEOUT;
const axiosInstace = axios.create({
    baseURL:BASEURL,
  
 })
 export default{
   get(url,param={}){
    return axiosInstace.get(url,param);
   },
   post(){

   },
   upload(){

   }
 }
