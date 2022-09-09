"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var axios_1 = require("axios");
var DateTime = require("luxon").DateTime;
var api = axios_1["default"].create({
    baseURL: "http://localhost:5000/blog/"
});
var defaultPost = [];
function BlogOverview() {
    var _a = react_1.useState(defaultPost), posts = _a[0], setPosts = _a[1];
    var _b = react_1.useState(50), count = _b[0], setCount = _b[1];
    var _c = react_1.useState(0), postPointer = _c[0], setPostsPointer = _c[1];
    //Initialize data
    react_1.useEffect(function () {
        api
            .get("/overview", {
            params: {
                pointer: postPointer
            }
        })
            .then(function (res) {
            setPosts(res.data);
        });
        api.get("/overview/count").then(function (res) {
            setCount(res.data);
        });
    }, []);
    //get data for next page
    react_1.useEffect(function () {
        api
            .get("/overview/", {
            params: {
                pointer: postPointer
            }
        })
            .then(function (res) {
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
    return (React.createElement("div", null,
        React.createElement("div", { className: " grid grid-cols-5 " },
            React.createElement("i", null),
            React.createElement("div", { className: "text-2xl p-3 text-center col-span-3 " },
                React.createElement("h1", null, "MOST RECENT POSTS"),
                posts ? (posts.map(function (post) { return PostContainer(post); })) : (React.createElement("h1", null, "No posts yet")),
                React.createElement("div", { className: "pt-5 " },
                    React.createElement("button", { className: "text-4xl hover:bg-custom-dark-blue w-10 ", onClick: getPrevSet }, "<"),
                    React.createElement("i", { className: "w-5 px-10" }),
                    React.createElement("button", { className: "text-4xl hover:bg-custom-dark-blue w-10", onClick: getNextSet }, ">"))),
            React.createElement("i", null))));
}
//Creates a singular post
var PostContainer = function (post) {
    var user_id = post.user_details._id;
    return ((React.createElement("div", { className: "border border-custom-silver mt-3 p-3 " },
        React.createElement("div", null,
            React.createElement("div", { className: "grid grid-cols-2 text-base " },
                React.createElement("div", { className: " text-left underline underline-offset-2 hover:text-custom-green-blue" },
                    React.createElement("a", { href: "/blog/" + post.user_details._id.toString() },
                        " ",
                        "Posted By: ",
                        post.user_details.username,
                        " ")),
                React.createElement("div", { className: "text-right" }, DateTime.fromISO(post.post_time).toFormat("ff"))),
            React.createElement("br", null),
            React.createElement("div", { className: "text-xl break-words" }, post.message)),
        React.createElement(react_router_dom_1.Outlet, null))));
};
exports["default"] = BlogOverview;
