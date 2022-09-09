"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__esModule = true; //IMPROTS//

var react_1 = require("react");

var axios_1 = require("axios");

var react_router_dom_1 = require("react-router-dom"); //API setup


var api = axios_1["default"].create({
  baseURL: "http://localhost:5000/blog/post",
  withCredentials: true
});

function BlogPost() {
  var navigate = react_router_dom_1.useNavigate();

  var _a = react_1.useState(false),
      messagePosted = _a[0],
      setMessagePosted = _a[1];

  var _b = react_1.useState(true),
      checked = _b[0],
      setChecked = _b[1];

  var _c = react_1.useState({
    message: "",
    isPublic: checked
  }),
      formValue = _c[0],
      setformValue = _c[1];

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    formValue;
    api.post("/", formValue).then(function (res) {
      if (res.status === 200) {
        setMessagePosted(true);
      }
    });
  };

  var handleChange = function handleChange(event) {
    var _a;

    setformValue(__assign(__assign({}, formValue), (_a = {}, _a[event.target.name] = event.target.value, _a)));
  };

  var handleCheck = function handleCheck() {
    setChecked(!checked);
  };

  react_1.useEffect(function () {
    formValue.isPublic = checked;
  }, [checked]);
  return react_1["default"].createElement("div", null, react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement("div", {
    className: "grid grid-cols-5 p-5 "
  }, react_1["default"].createElement("i", null), react_1["default"].createElement("form", {
    onSubmit: handleSubmit,
    className: "text-custom-green-blue border border-custom-silver text-center col-span-3 "
  }, react_1["default"].createElement("div", {
    className: "text-lg pt-5"
  }, "Please enter your message below."), react_1["default"].createElement("div", {
    className: "p-2 m-10"
  }, react_1["default"].createElement("textarea", {
    name: "message",
    "overflow-y": "hidden",
    placeholder: "Enter your message here",
    value: formValue.message,
    onChange: handleChange,
    required: true,
    className: "text-black p-2 h-44 w-full bg-custom-aquamarine",
    maxLength: 750
  })), messagePosted ? react_1["default"].createElement(SuccessMessage, null) : null, react_1["default"].createElement("div", {
    className: "p-2 m-2"
  }, react_1["default"].createElement("label", {
    className: "pr-2"
  }, "Public? "), react_1["default"].createElement("input", {
    type: "checkbox",
    name: "isPublic",
    checked: checked,
    onChange: handleCheck
  })), react_1["default"].createElement("div", {
    className: ""
  }, react_1["default"].createElement("button", {
    type: "submit",
    className: "bg-custom-dark-blue p-1 border border-custom-silver"
  }, "Submit"))), react_1["default"].createElement("i", null))));
}

var SuccessMessage = function SuccessMessage() {
  return react_1["default"].createElement("div", {
    className: "text-custom-green-blue border-custom-silver text-2xl border-b-4 border-t-4  animate-pulse"
  }, "Message successfully posted!");
};

exports["default"] = BlogPost;