import React, { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "../../components/DatePicker";
import { toast } from "react-toastify";
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

const Index = ({toggleModal}) => {
  const { dispatch } = useAddUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    data.eventdate = moment(data.eventdate).format("DD MMM YYYY");
    const addEvent = { ...data, id: uuidv4()};
    dispatch({ type: "ADD_EVENT", payload: { data: addEvent } });
    localStorage.setItem("event_data", JSON.stringify(addEvent));
    toast.success("You are Register Successfully", { autoClose: 1000 });
    toggleModal();
  };

  return (
    <Fragment>
      <div className="w-auto pt-10 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-300 rounded-lg shadow-lg p-8">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label
                className="block text-sm font-medium text-gray-700"
                for="ename"
              >
                Event Name<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="ename"
                control={control}
                defaultValue=""
                rules={{
                  required: "Event Name is required",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="ename"
                      placeholder="Please Enter Event Name"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.ename && (
                      <FormText className="text-red-500">
                        {errors.ename.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <Label
                className="block text-sm font-medium text-gray-700"
                for="hname"
              >
                Host Name<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="hname"
                control={control}
                defaultValue=""
                rules={{
                  required: "Host Name is required",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="hname"
                      placeholder="Please Enter Host Name"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.ename && (
                      <FormText className="text-red-500">
                        {errors.ename.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-1">
              <Label
                className="block text-sm font-medium mb-2 text-gray-700"
                for="eventdate"
              >
                Event Date<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="eventdate"
                control={control}
                rules={{
                  required: "Event Date is required",
                }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DatePicker
                      min={moment()._d}
                      placeholder="Enter Date of Birth"
                      invalid={errors?.dob && true}
                      onChange={(e) => onChange(e[0])}
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={value}
                    />
                  );
                }}
              />
              {errors && errors?.eventdate && (
                <FormText className="text-red-500">
                  {errors.eventdate?.message}
                </FormText>
              )}
            </div>
            <div>
              <Label
                className="block text-sm font-medium text-gray-700"
                for="hno"
              >
                House/Flat no/Office no/Floor no
                <span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="hno"
                control={control}
                defaultValue=""
                rules={{
                  required: "Require House/Flat no/Office no/Floor no",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="hno"
                      placeholder="Please Enter House/Flat no/Office no/Floor no"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.hno && (
                      <FormText className="text-red-500">
                        {errors.hno.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <Label
                className="block text-sm font-medium text-gray-700"
                for="address"
              >
                Address<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: "Enter your address",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="address"
                      placeholder="Please Enter Address"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.address && (
                      <FormText className="text-red-500">
                        {errors.address.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Label
                className="block text-sm font-medium text-gray-700"
                for="vipticket"
              >
                VIP Ticket<span className="text-red-500">&#42;</span>
              </Label>
              <Label
                className="block text-sm font-medium text-gray-700"
                for="vvipticket"
              >
                VVIP Ticket<span className="text-red-500">&#42;</span>
              </Label>
              <Label
                className="block text-sm font-medium text-gray-700"
                for="goldticket"
              >
                Gold Ticket<span className="text-red-500">&#42;</span>
              </Label>
            </div>
            <div className="flex justify-between">
              <Controller
                name="vipticket"
                control={control}
                defaultValue=""
                rules={{
                  required: "Enter your vipticket",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="vipticket"
                      placeholder="Rate"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.vipticket && (
                      <FormText className="text-red-500">
                        {errors.vipticket.message}
                      </FormText>
                    )}
                  </>
                )}
              />
              <Controller
                name="vvipticket"
                control={control}
                defaultValue=""
                rules={{
                  required: "Enter your vvipticket",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="vvipticket"
                      placeholder="Rate"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.vvipticket && (
                      <FormText className="text-red-500">
                        {errors.vvipticket.message}
                      </FormText>
                    )}
                  </>
                )}
              />
              <Controller
                name="goldticket"
                control={control}
                defaultValue=""
                rules={{
                  required: "Enter your goldticket",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="goldticket"
                      placeholder="Rate"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.goldticket && (
                      <FormText className="text-red-500">
                        {errors.goldticket.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              block
              className="w-full py-3 my-3 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
