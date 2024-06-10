import axios from "axios";
import { useEffect } from "react";
const baseURL=`http://kellogs.aivolved.in/api/`;
const BASEURL = `http://159.65.157.118:8001/api/`
const getToken = localStorage.getItem("token")
const token =  JSON.parse(getToken)
const API = axios.create({
  baseURL,
});

export {baseURL,BASEURL,token,API}