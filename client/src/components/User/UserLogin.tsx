//IMPROTS//
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
//API setup
const api = axios.create({
  baseURL: "https://shrouded-temple-70247.herokuapp.com/",
});



function UserLogin() {
  let navigate = useNavigate();

  const [formValue, setformValue] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let result = await api.post("/user/login/", formValue);
    if (result.status === 200) {
      navigate('/');
    }
  };

  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }
  return (
    <div>
      <div className="grid grid-cols-3 pt-5 ">
        <i />
        <form
          onSubmit={handleSubmit}
          className="text-white border border-custom-silver text-center p-4 "
      
        >
          <div className="text-lg">Please login below.</div>
          <div className="p-2 m-2">
            <label className="pr-2">Username: </label>
            <input
              type="username"
              name="username"
              placeholder="Enter your username"
              value={formValue.username}
              onChange={handleChange}
              required
              className="text-black p-0.5"
            />
          </div>
          <div className="p-2 m-2">
            <label className="pr-2">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formValue.password}
              onChange={handleChange}
              required
              className="text-black p-0.5"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-custom-dark-blue p-1 border border-custom-silver"
            >
              Submit
            </button>
          </div>
        </form>
        <i />
      </div>
    </div>
  );
}

export default UserLogin;
