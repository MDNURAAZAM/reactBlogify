import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "./api/loginApi";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const accessToken = token.accessToken;
          const refreshToken = token.refreshToken;

          setAuth({ user, accessToken, refreshToken });

          navigate("/");
        }
        setError("");
      }
    } catch (error) {
      setError(error?.response?.data?.error);
    }
  };
  return (
    <main>
      <section className="container">
        {/* <!-- Login Form into a box center of the page --> */}
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            {error && <p style={{color: 'red', margin: '5px'}}>{error}</p>}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="text-indigo-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
