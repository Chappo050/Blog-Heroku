//IMPROTS//
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../baseURL";

//API setup
const api = axios.create({
  baseURL: baseURL + "/user/logout",
  withCredentials: true,
});



function UserLogin() {

  let navigate = useNavigate();


  useEffect(() => {
    api.get('')
    setTimeout(function() {
  
      navigate('/')
    }, 2000);
  }, []);



  return (
    <div>
      <div className="text-whitefont-bold text-center m-10 text-2xl">
        Logout Successful. Redirecting.
      </div>
    </div>
  );
}

export default UserLogin;
