import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const { DateTime } = require("luxon");

const api = axios.create({
  baseURL: "http://localhost:5000/blog/",
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

const defaultPost: Post[] = [];

function BlogOverview() {
  const [posts, setPosts]: [Post[], (posts: Post[]) => void] =
    useState(defaultPost);

  const [count, setCount] = useState(50);

  const [postPointer, setPostsPointer] = useState(0);

  //Initialize data
  useEffect(() => {
    api
      .get("/overview", {
        params: {
          pointer: postPointer,
        },
      })
      .then((res) => {
        setPosts(res.data);
      });

    api.get("/overview/count").then((res) => {
      setCount(res.data);
    });
  }, []);

  //get data for next page
  useEffect(() => {
    api
      .get("/overview/", {
        params: {
          pointer: postPointer,
        },
      })
      .then((res) => {
        setPosts(res.data);
      });
    window.scrollTo(0, 0);
  }, [postPointer]);

  function getNextSet() {
    //increment pointer to get next 10
    if (postPointer + 10 > count) {
      return;
    }
    setPostsPointer(postPointer + 10);
  }

  function getPrevSet() {
    if (postPointer < 10) {
      return;
    }
    //increment pointer to get prev 10
    setPostsPointer(postPointer - 10);
  }

  return (
    <div>
      <div className=" grid grid-cols-5 ">
        <i />
        <div className="text-2xl p-3 text-center col-span-3 ">
          <h1>MOST RECENT POSTS</h1>
          {posts ? (
            posts.map((post) => PostContainer(post))
          ) : (
            <h1>No posts yet</h1>
          )}
          <div className="pt-5 ">
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
const PostContainer = (post: Post) => {
  return (
 (
        <div className="border border-custom-silver mt-3 p-3 ">
          <div>
            <div className="grid grid-cols-2 text-base ">
              <div className=" text-left underline underline-offset-2 hover:text-custom-green-blue">
                <a href={"/blog/" + post.user_details._id.toString()}>
                  {" "}
                  Posted By: {post.user_details.username}{" "}
                </a>
              </div>
              <div className="text-right">
                {DateTime.fromISO(post.post_time).toFormat("ff")}
              </div>
            </div>
            <br />
            <div className="text-xl break-words">{post.message}</div>
          </div>
          <Outlet />
        </div>
      )
  );
};

export default BlogOverview;
