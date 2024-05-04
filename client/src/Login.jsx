import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import "./css/Log.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("admin");
  console.log(role);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  axios.defaults.withCredentials = true;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    axios
      .post("http://localhost:3000/login", { email, password, role })
      .then((res) => {
        if (res.data.Status === "Success") {
          sessionStorage.setItem("department", res.data.department);
          sessionStorage.setItem("fName", res.data.fName);
          sessionStorage.setItem("lName", res.data.lName);
          sessionStorage.setItem("email", res.data.email);
          sessionStorage.setItem("id", res.data.id);
          if (res.data.designation === "admin") {
            navigate("/view/admin/approved");
          } else if (res.data.designation === "hod") {
            navigate("/duty/approve");
          } else {
            navigate("/");
          }
        } else {
          toast.error("Invalid email or password. Please try again.", {
            position: "top-center",
            autoClose: 3000,
            closeButton: false,
            style: { borderRadius: "100px" },
          });
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error logging in. Please try again later.", {
          position: "top-center",
          autoClose: 3000,
          closeButton: false,
          style: { borderRadius: "100px" },
        });
      });
  };

  return (
    <div className="background-image-login">
      <section className="ftco-section-login">
        <div className="container-login">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section-login">DUTY ALLOCATOR</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <div className="flex gap-2 mb-4 p-2 px-4 rounded-full bg-white text-black items-center">
                  <p className="font-semibold">Login as: </p>
                  <input
                    checked={role === "hod"}
                    value="hod"
                    type="radio"
                    id="role-hod"
                    name="role"
                    label="HOD"
                    onChange={(e) =>
                      e.target.checked && setRole(e.target.value)
                    }
                  />
                  <label htmlFor="role-hod">HOD</label>
                  <input
                    checked={role === "admin"}
                    onChange={(e) =>
                      e.target.checked && setRole(e.target.value)
                    }
                    value="admin"
                    type="radio"
                    id="role-admin"
                    name="role"
                    label="Admin"
                    defaultChecked
                  />
                  <label htmlFor="role-admin">Admin</label>
                </div>
                <form
                  id="login-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="signin-form font-semibold"
                >
                  <div className="form-group">
                    <p className="text-red-500">{errors.email?.message}</p>
                    <input
                      {...register("email", {
                        required: "Enter your email",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="text"
                      className="form-control-login"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group password-input">
                    <p className="text-red-500">{errors.password?.message}</p>
                    <input
                      {...register("password", {
                        required: "Enter your password",
                      })}
                      id="password-field"
                      type={showPassword ? "text" : "password"}
                      className="form-control-login"
                      placeholder="Password"
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="field-icon toggle-password"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control-login btn-login btn-login-primary submit px-3"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Login;
