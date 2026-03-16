import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import logo from "../assets/logo.jpeg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://solar-share-backend.onrender.com/login", {
        username,
        password,
      });
      if (response.data !== "Fail") {
        login(response.data);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-10 px-4">
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol col="12" lg="10" xl="9">

            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-emerald-100 border border-emerald-100 flex flex-col lg:flex-row">

              <MDBCol lg="6" className="d-flex align-items-center bg-white">
                <div className="w-100 px-8 py-10 sm:px-12">

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm mb-4">
                      <img
                        src={logo}
                        style={{ width: "40px" }}
                        alt="logo"
                      />
                    </div>
                    <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-1">
                      Welcome back
                    </p>
                    <h4 className="text-xl font-bold text-gray-800 leading-tight">
                      Solar Share
                    </h4>
                  </div>

                  <p className="text-sm text-gray-400 font-medium mb-6 text-center">
                    Sign in to your account to continue
                  </p>

                  <div className="mb-4">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass="mb-2"
                      label="Password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="text-right mb-5">
                    <a
                      className="text-xs text-emerald-500 hover:text-emerald-700 font-semibold transition-colors"
                      href="#!"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-300 transition-all duration-200 active:scale-95 border-0 mb-6"
                  >
                    Sign In
                  </button>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gray-100"></div>
                    <span className="text-xs text-gray-300 font-medium">OR</span>
                    <div className="flex-1 h-px bg-gray-100"></div>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <p className="text-sm text-gray-400 mb-0">
                      Don't have an account?
                    </p>
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-sm font-bold text-emerald-600 border-2 border-emerald-200 px-4 py-1.5 rounded-lg hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200"
                    >
                      Register
                    </button>
                  </div>

                </div>
              </MDBCol>

              <MDBCol
                lg="6"
                className="d-flex align-items-center bg-gradient-to-br from-emerald-500 to-teal-600 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white opacity-5 rounded-full"></div>
                <div className="absolute -bottom-12 -left-8 w-40 h-40 bg-white opacity-5 rounded-full"></div>
                <div className="absolute top-12 left-6 w-10 h-10 bg-white opacity-5 rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-6 h-6 bg-white opacity-10 rounded-full"></div>

                <div className="relative text-white px-8 py-12 sm:px-12">
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-3">
                    Unlock India's Rooftop Potential
                  </p>
                  <h4 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                    Your Roof, Your Revenue. India’s Future
                  </h4>

                  <div className="w-12 h-1 bg-white opacity-30 rounded-full mb-5"></div>

                  <p className="text-emerald-100 text-sm leading-relaxed mb-8">
                     Where Empty Space Meets Clean Energy
                  </p>
                </div>
              </MDBCol>

            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
