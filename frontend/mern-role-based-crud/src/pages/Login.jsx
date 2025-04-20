import React, { useContext } from "react";
import AuthContext from "../providers/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const from = location.state?.from?.pathname || "/";

    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User login successfully",
        showClass: {
          popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
        },
        hideClass: {
          popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
        },
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-center font-bold text-3xl mt-10">Login Now</h1>

      <form onSubmit={handleLogin} className="max-w-2xl px-5 w-full mx-auto ">
        <fieldset className="fieldset mt-4">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            className="input w-full"
            placeholder="Please provide your email"
            name="email"
            required
          />
        </fieldset>
        <fieldset className="fieldset mt-4">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input w-full"
            placeholder="Please provide your password"
            name="password"
          />
        </fieldset>

        <button className="btn btn-neutral mt-5" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
