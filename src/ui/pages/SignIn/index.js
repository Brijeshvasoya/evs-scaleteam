import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import InputPasswordToggle from "../../components/input-password-toggle";
import { useAddUser } from "../../../redux/reducer";

import {
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";

const Index = () => {
  const navigate = useNavigate();
  const { dispatch } = useAddUser();
  const { userData } = useSelector((state) => state?.user);
  const source = require(`../../../logo.png`);
  const cover = require(`../../../assets/images/pages/login-cover.webp`);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["Remember"]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (userData && userData.length > 0) {
      if (rememberMe) {
        setCookie("Remember", JSON.stringify(data?.email));
      }
      const matchedUser = userData.find(
        (item) =>
          item?.email === data?.email && item?.password === data?.password
      );
      if (matchedUser) {      
        const newUser = { ...matchedUser, isVerified: true };
        dispatch({ type: "EDIT_USER", payload: { data: newUser } });
        dispatch({ type: "LOGIN_USER", payload: { data: newUser } });
        toast.success("Login Successfully", { autoClose: 1000 });
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password", { autoClose: 2000 });
      }
    } else {
      toast.error("There are some errors in Login", { autoClose: 2000 });
    }
    reset();
  };

  return (
    <div className="flex h-screen container">
      <div className="w-1/2 flex flex-col justify-start items-start p-8">
        <img
          src={source}
          alt="logo img"
          className="w-32 cursor-pointer "
          onClick={() => navigate("/")}
        />
        <img src={cover} alt="cover img" className="w-auto mt-4 h-4/5  mx-4" />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <img
              src={source}
              alt="logo"
              className="mx-auto h-10 cursor-pointer"
            />
          </div>

          <CardTitle
            tag="h2"
            className="text-3xl font-semibold text-center text-gray-900 mb-2"
          >
            Welcome to EVS
          </CardTitle>
          <CardText className="text-center text-gray-600 mb-6">
            Please sign-in to your account and start the adventure
          </CardText>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1">
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
                      placeholder="Please Enter Email"
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
                    value: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
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

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Input
                  checked={rememberMe}
                  type="checkbox"
                  className="mr-2"
                  id="remember-me"
                  defaultChecked={false}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <Label className="text-sm text-gray-600" htmlFor="remember-me">
                  Remember Me
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              block
              className="w-full py-3 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign In
            </Button>
          </Form>

          <p className="text-center mt-4 text-sm text-gray-600">
            New on our platform?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;