//IMPROTS//
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
//API setup
const api = axios.create({
  baseURL: "/api" + window.location.pathname,
  withCredentials: true
});

function PostEdit() {
  let navigate = useNavigate();

  const [messagePosted, setMessagePosted] = useState(false);

  const [auth, setAuth] = useState(true); //replace with real Auth later

  const [formValue, setformValue] = useState({
    _id: "",
    user_details: {},
    message: "",
    post_time: "",
    isPublic: true,
  });

  useEffect(() => {
    if (!auth) {
      navigate("/user/login");
    }
    api.get(window.location.href).then((res) => {
      setformValue(res.data[0]);
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let result = await axios.post(window.location.pathname, formValue);
    if (result.status === 200) {
      setMessagePosted(true);
    }
  };

  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = () => {
    setformValue({
      _id: formValue._id,
      user_details: formValue.user_details,
      message: formValue.message,
      post_time: formValue.post_time,
      isPublic: !formValue.isPublic,
    });
  };

  return (
    <div>
      <>
        <div className="grid grid-cols-5 p-5 ">
          <i />
          <form
            onSubmit={handleSubmit}
            className="text-custom-green-blue border border-custom-silver text-center col-span-3"
          >
            <div className="text-lg pt-5">Please Edit Your Post.</div>

            <div className="p-2 m-10">
              <textarea
                name="message"
                overflow-y="hidden"
                value={formValue.message}
                onChange={handleChange}
                required
                className="text-black p-2 h-44 w-full bg-custom-aquamarine"
                maxLength={750}
              >
                {" "}
              </textarea>
            </div>

            {messagePosted ? <SuccessMessage /> : null}

            <div className="p-2 m-2">
              <label className="pr-2">Public? </label>
              <input
                type="checkbox"
                name="isPublic"
                checked={formValue.isPublic}
                onChange={handleCheck}
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-custom-dark-blue p-1 border border-custom-silver"
              >
                Submit
              </button>
            </div>
          </form>
          <i />
        </div>
      </>
    </div>
  );
}

const SuccessMessage = () => {
  return (
    <div className="text-custom-green-blue border-custom-silver text-2xl border-b-4 border-t-4  animate-pulse">
      Message successfully updated!
    </div>
  );
};

export default PostEdit;
