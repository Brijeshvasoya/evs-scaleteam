import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Label, FormText } from "reactstrap";
import InputPasswordToggle from "../../components/input-password-toggle";
import logo from "../../../logo.png";
import source from "../../../assets/images/pages/forgot-password.avif";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit = (data,e) => {
    e.preventDefault()
    setLoading(true);
    const userExists = userData?.find((user) => user.email === data.email);
    if (userExists) {
      const updatedUsers = userData.map((user) =>
        user.email === data.email ? { ...user, password: data.password } : user
      );
      dispatch({ type: "EDIT_USER", payload: { data: updatedUsers } });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Password reset successfully!", { autoClose: 1000 });
      navigate("/")
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Email not found. Please try again.",{autoClose:2000});
    }
    reset();
  };

  return (
    <div className="flex h-screen container">
      <div className="w-1/2 flex flex-col justify-start items-start p-8">
        <img
          src={logo}
          alt="logo img"
          className="w-32 cursor-pointer "
          onClick={() => navigate("/")}
        />
        <img src={source} alt="cover img" className="w-full mt-4 h-4/5 mx-4" />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <img
              src={logo}
              alt="logo"
              className="mx-auto h-10 cursor-pointer"
            />
          </div>

          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-2">
            Forgot Password? 🔒
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email, New Password, and Confirm Password
          </p>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label
                className="block text-sm font-medium text-gray-700"
                for="email"
              >
                Email<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="Please enter email"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.email?.message && (
                      <FormText className="text-red-500">
                        {errors.email?.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required",
                  pattern: {
                    value: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i,
                    message: "Password must be between 6 and 16 characters",
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputPasswordToggle
                      {...field}
                      label="Password"
                      htmlFor="Password"
                      visible={false}
                      iconSize={18}
                      placeholder="Enter Your Password"
                      inputClassName="mt-2 p-3 w-full rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.password?.message && (
                      <FormText className="text-red-500">
                        {errors.password?.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                name="cpassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                  pattern: {
                    value: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i,
                    message: "Password must be between 6 and 16 characters",
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputPasswordToggle
                      {...field}
                      label="Confirm Password"
                      htmlFor="cpassword"
                      visible={false}
                      iconSize={18}
                      placeholder="Enter Confirm Password"
                      inputClassName="mt-2 p-3 w-full rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.cpassword?.message && (
                      <FormText className="text-red-500">
                        {errors.cpassword?.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>

            <Button
              type="submit"
              block
              disabled={loading}
              className={`w-full py-2 px-4 font-semibold text-white rounded-lg transition-all ${
                loading
                  ? "bg-slate-400  cursor-not-allowed"
                  : "bg-slate-800  hover:bg-slate-600 "
              }`}
            >
              {loading ? "Sending..." : "ReSet Password"}
            </Button>
          </Form>
          <Link
            to="/"
            className="flex items-center justify-center mt-4 text-blue-600 hover:underline"
          >
            <ChevronLeft size={20} />
            <span className="mb-1">Back to login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
