import axios from "axios";

/**
 *
 * @param {String} username
 * @param {String} password
 */
export const checkLogin = async (username, password) => {
  try {
    let { data } = await axios.post("http://173.230.139.42:8000/api/v1/login", {
      username,
      password,
    });
    if (data.status === "Failed")
      alert("Login Failed Please check your credentials");
    if (data.status === "ok" && data.user.submitted === false) {
      window.sessionStorage.setItem("jwt", data.token);
      window.location.pathname = "/card";
    }
  } catch (e) {
    //	console.log(e.message);
    alert(e.message);
  }
};

export const checkToken = async (token) => {
  //	console.log(token);
  if (!token) return false;

  let { data } = await axios.post(
    "http://173.230.139.42:8000/api/v1/login/check",
    {
      jwt: token,
    }
  );

  if (
    data.status === "verified" &&
    (!data.submitted || data.user.submitted === false)
  )
    return true;

  return false;
};
