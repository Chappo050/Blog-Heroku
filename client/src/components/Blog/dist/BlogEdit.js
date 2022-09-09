"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
//IMPROTS//
var react_1 = require("react");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
//API setup
var api = axios_1["default"].create({
    baseURL: window.location.href,
    withCredentials: true
});
function PostEdit() {
    var _this = this;
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(false), messagePosted = _a[0], setMessagePosted = _a[1];
    var _b = react_1.useState(true), auth = _b[0], setAuth = _b[1]; //replace with real Auth later
    var _c = react_1.useState({
        _id: "",
        user_details: {},
        message: "",
        post_time: "",
        isPublic: true
    }), formValue = _c[0], setformValue = _c[1];
    react_1.useEffect(function () {
        if (!auth) {
            navigate("/user/login");
        }
        api.get(window.location.href).then(function (res) {
            setformValue(res.data[0]);
        });
    }, []);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, axios_1["default"].post(window.location.pathname, formValue)];
                case 1:
                    result = _a.sent();
                    if (result.status === 200) {
                        setMessagePosted(true);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleChange = function (event) {
        var _a;
        setformValue(__assign(__assign({}, formValue), (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var handleCheck = function () {
        setformValue({
            _id: formValue._id,
            user_details: formValue.user_details,
            message: formValue.message,
            post_time: formValue.post_time,
            isPublic: !formValue.isPublic
        });
    };
    return (React.createElement("div", null,
        React.createElement(React.Fragment, null,
            React.createElement("div", { className: "grid grid-cols-5 p-5 " },
                React.createElement("i", null),
                React.createElement("form", { onSubmit: handleSubmit, className: "text-custom-green-blue border border-custom-silver text-center col-span-3" },
                    React.createElement("div", { className: "text-lg pt-5" }, "Please Edit Your Post."),
                    React.createElement("div", { className: "p-2 m-10" },
                        React.createElement("textarea", { name: "message", "overflow-y": "hidden", value: formValue.message, onChange: handleChange, required: true, className: "text-black p-2 h-44 w-full bg-custom-aquamarine", maxLength: 750 }, " ")),
                    messagePosted ? React.createElement(SuccessMessage, null) : null,
                    React.createElement("div", { className: "p-2 m-2" },
                        React.createElement("label", { className: "pr-2" }, "Public? "),
                        React.createElement("input", { type: "checkbox", name: "isPublic", checked: formValue.isPublic, onChange: handleCheck })),
                    React.createElement("div", { className: "" },
                        React.createElement("button", { type: "submit", className: "bg-custom-dark-blue p-1 border border-custom-silver" }, "Submit"))),
                React.createElement("i", null)))));
}
var SuccessMessage = function () {
    return (React.createElement("div", { className: "text-custom-green-blue border-custom-silver text-2xl border-b-4 border-t-4  animate-pulse" }, "Message successfully updated!"));
};
exports["default"] = PostEdit;
