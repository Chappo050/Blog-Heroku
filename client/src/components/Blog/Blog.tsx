//IMPROTS//
import { Outlet } from "react-router-dom";
import axios from "axios";

//Components//
import Nav from "../Nav";

//API setup
const api = axios.create({
  baseURL: "http://localhost:5000/blog/",
});

function BlogIndex() {

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default BlogIndex;
