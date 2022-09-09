//IMPROTS//
import { Outlet } from "react-router-dom";
import axios from "axios";

//Components//
import Nav from "../Nav";

//API setup
const api = axios.create({
  baseURL: "https://shrouded-temple-70247.herokuapp.com/blog/",
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
