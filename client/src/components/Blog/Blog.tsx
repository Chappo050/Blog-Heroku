//IMPROTS//
import { Outlet } from "react-router-dom";

//Components//
import Nav from "../Nav";

function BlogIndex() {

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default BlogIndex;
