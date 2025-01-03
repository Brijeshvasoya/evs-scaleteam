import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label, Button, Input, FormGroup, FormText } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Camera, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import ConfirmationModal from '../../components/Alert';
import DatePicker from "../../components/DatePicker";
import dummyImg from "../../../assets/images/avatars/avatar-blank.png";

const Index = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state.user);
  const [base64Url, setBase64Url] = useState("");
  const [cancel, setCancel] = useState(false);
  const [, removeCookie] = useCookies();

  useEffect(() => {
    if (activeUser) {
      setValue("fname", activeUser?.fname);
      setValue("lname", activeUser?.lname);
      setValue("email", activeUser?.email);
      setValue("dob", activeUser?.dob);
      setValue("password", activeUser?.password);
      setValue("age", activeUser?.age);
    }
    if (activeUser?.profilePicture) {
      setCancel(true);
    }
  }, [activeUser, setValue]);

  useEffect(() => {
    if (base64Url) {
      toast.success("Your Profile Photo add successfully", { autoClose: 1000 });
      setCancel(true);
    }
  }, [base64Url]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBase64Url(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    let newDetail
    if (base64Url) {
       newDetail = {
        ...data,
        id: activeUser?.id,
        profilePicture: base64Url,
        isVerified: true,
        role: activeUser?.role,
        isDeleted:false
      };
    //   dispatch({ type: "EDIT_USER", payload: { data: newDetail } });
    //   dispatch({ type: "LOGIN_USER", payload: { data: newDetail } });
    } else {
       newDetail = {
        ...data,
        id: activeUser?.id,
        isVerified: true,
        role: activeUser?.role,
        isDeleted:false
      };
    }
    dispatch({ type: "EDIT_USER", payload: { data: newDetail } });
    dispatch({ type: "LOGIN_USER", payload: { data: newDetail } });
    if (activeUser?.role === "Admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
    toast.success("Your Profile Updated Successfully", { autoClose: 1000 });
  };
  const removeImg = () => {
    const newDetail = { ...activeUser, profilePicture: null };
    dispatch({ type: "LOGIN_USER", payload: { data: newDetail } });
    setBase64Url(null);
    setCancel(false);
    toast.success("Your Profile Photo is Removed", { autoClose: 1000 });
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const handleDeleteAccount = () => {
    ConfirmationModal(
      "warning",
      "Are you sure?",
      "You won't be able to revert this!",
      "Yes, delete it!",
      true
    ).then((result) => {
      if (result.isConfirmed) {
        ConfirmationModal(
          "success",
          "Deleted!",
          "Employee has been deleted.",
          "ok",
          false
        ).then(() => {
          const newDetail = { ...activeUser, isDeleted: true };
          dispatch({ type: "EDIT_USER", payload: { data: newDetail } });
          localStorage.removeItem("active_user");
          removeCookie("Remember");
          toast.error("Your Profile is Deleted", { autoClose: 2000 });
          navigate("/");
        });
      } else {
        toast.error("Your Profile is not deleted");
      }
    });
  };
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-10">
          <div>
            <img
              src={
                cancel
                  ? base64Url || activeUser?.profilePicture || dummyImg
                  : base64Url || dummyImg
              }
              alt="Profile"
              className="rounded-full h-24 w-24 object-cover"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="upload-image"
            />
            {cancel && (
              <Label
                htmlFor="remove-image"
                className="cursor-pointer relative left-12 top-2 text-slate-800"
                onClick={removeImg}
              >
                <Trash2 className="text-red-600" />
              </Label>
            )}
            <Label
              htmlFor="upload-image"
              className="cursor-pointer relative left-20 -top-4 text-slate-800"
            >
              <Camera />
            </Label>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">
              {activeUser?.fname} {activeUser?.lname}
            </h2>
            <p className="text-sm text-gray-500">{activeUser?.email}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section bg-[#f3f2f0] p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700">
            Basic Information
          </h3>

          <div className="mt-4">
            <div className="mb-4">
              <Label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </Label>
              <Controller
                name="fname"
                control={control}
                defaultValue=""
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter First Name"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              />
              {errors.fname && <FormText>{errors.fname.message}</FormText>}
            </div>
            <div className="mb-4">
              <Label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </Label>
              <Controller
                name="lname"
                control={control}
                defaultValue=""
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Last Name"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              />
              {errors.lname && <FormText>{errors.lname.message}</FormText>}
            </div>
            <div className="mb-4">
              <Label
                htmlFor="dob"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Date of Birth
              </Label>
              <Controller
                name="dob"
                control={control}
                defaultValue=""
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    placeholderText="Enter Date of Birth"
                    selected={field.value}
                    className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              />
              {errors.dob && <FormText>{errors.dob.message}</FormText>}
            </div>
            <div className="mb-4">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter Email"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              />
              {errors.email && <FormText>{errors.email.message}</FormText>}
            </div>
            <div className="mb-1">
              <Label
                className="block text-sm font-medium text-gray-700"
                for="age"
              >
                Age<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="age"
                control={control}
                defaultValue=""
                rules={{
                  required: "Age is required",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Your Age"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.age?.message && (
                      <FormText className="text-red-500">
                        {errors.age?.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex mt-6 justify-end space-x-3">
            <Button
              type="button"
              color="secondary"
              onClick={handleDeleteAccount}
              className="w-32 py-2 text-white font-medium rounded-lg bg-red-600 hover:bg-red-500"
            >
              Delete Account
            </Button>
            <Button
              type="button"
              color="secondary"
              onClick={handleCancel}
              className="w-32 py-2 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              className="w-32 py-2 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
            >
              Update Profile
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Index;
