"use strict";
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var DateTime = require("luxon").DateTime;
var api = axios_1["default"].create({
    baseURL: window.location.hostname + "/api" + window.location.pathname,
    withCredentials: true
});
var defaultPost = [];
function BlogUser() {
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(defaultPost), posts = _a[0], setPosts = _a[1];
    var _b = react_1.useState(0), count = _b[0], setCount = _b[1];
    var _c = react_1.useState(0), postPointer = _c[0], setPostsPointer = _c[1];
    var _d = react_1.useState(true), auth = _d[0], setAuth = _d[1]; //replace with real Auth later
    var fetchPosts = function () {
        api.get('/auth').then(function (res) {
            var results = res.data;
            setAuth(results.logged);
        });
        api
            .get("/", {
            params: {
                pointer: postPointer,
                auth: auth
            }
        })
            .then(function (res) {
            setPosts(res.data);
        });
        api
            .get("/count", {
            params: {
                auth: auth
            }
        })
            .then(function (res) {
            setCount(res.data);
        });
    };
    //Initialize data
    react_1.useEffect(function () {
        fetchPosts();
    }, []);
    //get data for next page
    react_1.useEffect(function () {
        fetchPosts();
        window.scrollTo(0, 0);
    }, [postPointer]);
    function getNextSet() {
        //increment pointer to get next 10
        if (count - (postPointer + 10) > 0) {
            setPostsPointer(postPointer + 10);
        }
        return;
    }
    function getPrevSet() {
        if (postPointer < 10) {
            return;
        }
        //increment pointer to get prev 10
        setPostsPointer(postPointer - 10);
    }
    function delPost(postId) {
        api["delete"]("/", {
            params: {
                postId: postId
            }
        });
        fetchPosts();
    }
    function editPost(postId) {
        navigate("/blog/post/" + postId);
    }
    return (React.createElement("div", null,
        React.createElement(react_router_dom_1.Outlet, null),
        React.createElement("div", { className: " grid grid-cols-5" },
            React.createElement("i", null),
            React.createElement("div", { className: "text-2xl text-center col-span-3" },
                React.createElement("h1", null, "USERS PAGE!"),
                posts.length > 0 ?
                    posts.map(function (post) { return PostContainer(post, auth, delPost, editPost); })
                    :
                        React.createElement("h1", null, "No posts yet"),
                React.createElement("div", { className: "pt-5" },
                    React.createElement("button", { className: "text-4xl hover:bg-custom-dark-blue w-10 ", onClick: getPrevSet }, "<"),
                    React.createElement("i", { className: "w-5 px-10" }),
                    React.createElement("button", { className: "text-4xl hover:bg-custom-dark-blue w-10", onClick: getNextSet }, ">"))),
            React.createElement("i", null))));
}
//Creates a singular post
var PostContainer = function (post, auth, delPost, editPost) {
    return (React.createElement("div", { className: "border border-custom-silver mt-3 p-3" },
        React.createElement("div", null,
            React.createElement("div", { className: "grid grid-cols-2 text-base " },
                React.createElement("div", { className: " text-left" },
                    "Posted By: ",
                    post.user_details.username),
                React.createElement("div", { className: "text-right" },
                    "Post time: ",
                    DateTime.fromISO(post.post_time).toFormat("ff"))),
            React.createElement("br", null),
            React.createElement("div", { className: "text-xl break-words" }, post.message)),
        auth ? (React.createElement("div", { className: "text-left" },
            React.createElement("button", { className: "bg-custom-dark-blue p-1 text-base mx-1", onClick: function () { return delPost(post._id); } }, "Del"),
            React.createElement("button", { className: "bg-custom-dark-blue p-1 text-base mx-1", onClick: function () { return editPost(post._id); } }, "Edit"))) : (React.createElement(React.Fragment, null))));
};
exports["default"] = BlogUser;
