// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LoginSuccess() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = new URLSearchParams(window.location.search).get("token");

//     if (token) {
//       localStorage.setItem("token", token);
//       navigate("/");
//     }
//   }, []);

//   return <p>Logging in...</p>;
// }
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      navigate("/");
    }
  }, []);

  return <p>Logging in...</p>;
}
