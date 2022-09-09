"use strict";
exports.__esModule = true;
//IMPROTS//
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
//Components//
var Nav_1 = require("../Nav");
//API setup
var api = axios_1["default"].create({
    baseURL: "http://localhost:5000/blog/"
});
function BlogIndex() {
    return (React.createElement("div", null,
        React.createElement(Nav_1["default"], null),
        React.createElement(react_router_dom_1.Outlet, null)));
}
exports["default"] = BlogIndex;
