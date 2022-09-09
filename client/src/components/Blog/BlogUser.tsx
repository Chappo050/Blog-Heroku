import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";

const { DateTime } = require("luxon");

const api = axios.create({
  baseURL: window.location.href,
  withCredentials: true,
});

interface User {
  _id: String;
  username: String;
}

interface Post {
  _id: String;
  user_details: User;
  message: String;
  post_time: String;
  isPublic: Boolean;
}

interface authJSON {
  logged: boolean,
}
const defaultPost: Post[] = [];

function BlogUser() {
  let navigate = useNavigate();


  const [posts, setPosts]: [Post[], (posts: Post[]) => void] =
    useState(defaultPost);

  const [count, setCount] = useState(0);

  const [postPointer, setPostsPointer] = useState(0);

  const [auth, setAuth] = useState(true); //replace with real Auth later

  const fetchPosts = () => {
    api.get('/auth').then((res) => {
     const results:authJSON =  res.data;
    setAuth(results.logged)
    
    })

    api
      .get("/", {
        params: {
          pointer: postPointer,
          auth: auth,
        },
      })
      .then((res) => {
        setPosts(res.data);
      });

    api
      .get("/count", {
        params: {
          auth: auth,
        },
      })
      .then((res) => {
        setCount(res.data);
      });
  };

  //Initialize data
  useEffect(() => {
    fetchPosts();
  }, []);

  //get data for next page
  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0);
  }, [postPointer]);

  function getNextSet() {
    //increment pointer to get next 10
    if (count - (postPointer + 10) > 0) {
      setPostsPointer(postPointer + 10);
    }
    return
  }

  function getPrevSet() {
    if (postPointer < 10) {
      return;
    }
    //increment pointer to get prev 10
    setPostsPointer(postPointer - 10);
  }

  function delPost(postId: String) {
    api.delete("/", {
      params: {
        postId: postId,
      },
    });
    fetchPosts();
  }

  function editPost(postId: String) {
    navigate("/blog/post/" + postId);
  }

  return (
    <div>
      <Outlet />
      <div className=" grid grid-cols-5">
        <i />
        <div className="text-2xl text-center col-span-3">
          <h1>USERS PAGE!</h1>
          {posts.length > 0 ? (
            posts.map((post) => PostContainer(post, auth, delPost, editPost))
          ) : (
            <h1>No posts yet</h1>
          )}
          <div className="pt-5">
            <button
              className="text-4xl hover:bg-custom-dark-blue w-10 "
              onClick={getPrevSet}
            >
              {"<"}
            </button>
            <i className="w-5 px-10" />
            <button
              className="text-4xl hover:bg-custom-dark-blue w-10"
              onClick={getNextSet}
            >
              {">"}
            </button>
          </div>
        </div>

        <i />
      </div>
    </div>
  );
}

//Creates a singular post
const PostContainer = (
  post: Post,
  auth: boolean,
  delPost: Function,
  editPost: Function
) => {
  return (
    <div className="border border-custom-silver mt-3 p-3">
      <div>
        <div className="grid grid-cols-2 text-base ">
          <div className=" text-left">
            Posted By: {post.user_details.username}
          </div>
          <div className="text-right">
            Post time: {DateTime.fromISO(post.post_time).toFormat("ff")}
          </div>
        </div>
        <br />
        <div className="text-xl break-words">{post.message}</div>
      </div>
      {auth ? (
        <div className="text-left">
          <button
            className="bg-custom-dark-blue p-1 text-base mx-1"
            onClick={() => delPost(post._id)}
          >
            Del
          </button>
          <button
            className="bg-custom-dark-blue p-1 text-base mx-1"
            onClick={() => editPost(post._id)}
          >
            Edit
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BlogUser;
