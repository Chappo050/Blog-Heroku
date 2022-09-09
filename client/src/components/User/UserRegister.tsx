//IMPROTS//
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//API setup
const api = axios.create({
  baseURL: "https://shrouded-temple-70247.herokuapp.com/user/register",
});


function UserRegister() {
  

  let navigate = useNavigate();

  const [formValue, setformValue] = React.useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let result = await api.post("/", formValue);
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
          className="text-white border border-custom-silver text-center p-5"
      
        >
          <div className="text-lg">Please register your account below.</div>
          <div className="p-2 m-2 grid grid-cols-3">
            <label className="pr-2 flex">Username: </label>
            <input
              type="username"
              name="username"
              placeholder="Enter your username"
              value={formValue.username}
              onChange={handleChange}
              required
              className="text-black p-0.5 col-span-2"
            />
          </div>
          <div className="p-2 m-2  grid grid-cols-3">
            <label className="pr-2 flex">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formValue.email}
              onChange={handleChange}
              required
              className="text-black p-0.5 col-span-2"
            />
          </div>
          <div className="p-2 m-2  grid grid-cols-3">
            <label className="pr-2 flex">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formValue.password}
              onChange={handleChange}
              required
              className="text-black p-0.5 col-span-2"
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

export default UserRegister;
