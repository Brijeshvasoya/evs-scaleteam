import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { Form, Label, Input, Button, FormText } from "reactstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EVENT, EDIT_EVENT } from "./mutation";
import { GET_ALL_EVENTS } from "../Dashboard/query";
import DatePicker from "../../components/DatePicker";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const Index = ({ toggleModal, editEvent, setEditEvent, refetch }) => {
  const [createEvent, { loading }] = useMutation(ADD_EVENT);
  const [EditEvent, { loading: editLoading }] = useMutation(EDIT_EVENT, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });
  const [edit, setEdit] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (editEvent) {
      setEdit(editEvent);
      setValue("ename", editEvent.ename);
      setValue("hname", editEvent.hname);
      const eventDate = moment(editEvent.eventdate, "DD MMM YYYY").toDate();
      setValue("eventdate", eventDate);
      setValue("hno", editEvent.hno);
      setValue("address", editEvent.address);
      setValue("vipticket", editEvent.vipticket);
      setValue("vvipticket", editEvent.vvipticket);
      setValue("goldticket", editEvent.goldticket);
    } else {
      setEdit(null);
      reset();
    }
  }, [editEvent, reset, setValue]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    data.eventdate = moment(data.eventdate).format("DD MMM YYYY");
    if (!editEvent) {
      if (data) {
        createEvent({ variables: { eventNew: data } })
          .then(() => {
            refetch();
            toast.success("Your Event Successfully Added", { autoClose: 1000 });
          })
          .catch((error) => {
            toast.error(error?.message, { autoClose: 2000 });
          });
      }
      else {
        toast.error("Please fill all the fields", { autoClose: 2000 });
      }
    } else {
      if (data) {
        EditEvent({ variables: { eventId: editEvent._id, eventUpdate: data } })
          .then(() => {
            toast.success("Event Edited Successfully", { autoClose: 1000 });
            setEdit(null);
            setEditEvent(null);
          })
          .catch((error) => {
            toast.error(error?.message, { autoClose: 2000 });
          });
      }
      else {
        toast.error("Please fill all the fields", { autoClose: 2000 });
      }
    }
    toggleModal();
  };

  if(loading || editLoading){
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Spinner size={75} color="#ffffff" />
      </div>
    );
  }
  return (
    <div className="flex w-full min-h-[500px] bg-white rounded-lg overflow-hidden shadow-xl">
      <div className="w-1/3 bg-slate-800 text-white p-8 flex flex-col justify-center items-center space-y-4 relative">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {editEvent ? "Edit Event" : "Add New Event"}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {editEvent
              ? "Update the details of your existing event with precision and care."
              : "Create a new event and invite participants to an unforgettable experience."}
          </p>
        </div>
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <div className="inline-block bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {editEvent ? "Editing Mode" : "Creation Mode"}
          </div>
        </div>
      </div>

      <div className="w-2/3 bg-white p-8 overflow-y-auto">
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                className="block text-sm font-medium text-gray-700 mb-2"
                for="ename"
              >
                Event Name<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="ename"
                control={control}
                rules={{ required: "Event Name is required" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="ename"
                      placeholder="Please Enter Event Name"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    />
                    {errors.ename && (
                      <FormText className="text-red-500 mt-1">
                        {errors.ename.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <Label
                className="block text-sm font-medium text-gray-700 mb-2"
                for="hname"
              >
                Host Name<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="hname"
                control={control}
                rules={{ required: "Host Name is required" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="hname"
                      placeholder="Please Enter Host Name"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    />
                    {errors.hname && (
                      <FormText className="text-red-500 mt-1">
                        {errors.hname.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div>
            <Label
              className="block text-sm font-medium mb-2 text-gray-700"
              for="eventdate"
            >
              Event Date<span className="text-red-500">&#42;</span>
            </Label>
            <Controller
              name="eventdate"
              control={control}
              rules={{ required: "Event Date is required" }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  min={moment()._d}
                  onChange={(e) => onChange(e[0])}
                  placeholder="Enter Event Date"
                  className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  value={
                    value || (edit?.eventdate ? moment(edit.eventdate, "DD MMM YYYY").toDate() : null)
                  }
                />
              )}
            />
            {errors?.eventdate && (
              <FormText className="text-red-500 mt-1">
                {errors.eventdate.message}
              </FormText>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                className="block text-sm font-medium text-gray-700 mb-2"
                for="hno"
              >
                House/Flat no/Office no/Floor no
                <span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="hno"
                control={control}
                rules={{ required: "Require House/Flat no/Office no/Floor no" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="hno"
                      placeholder="Please Enter House/Flat no/Office no/Floor no"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    />
                    {errors.hno && (
                      <FormText className="text-red-500 mt-1">
                        {errors.hno.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <Label
                className="block text-sm font-medium text-gray-700 mb-2"
                for="address"
              >
                Address<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Enter your address" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="address"
                      placeholder="Please Enter Address"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    />
                    {errors.address && (
                      <FormText className="text-red-500 mt-1">
                        {errors.address.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              type="submit"
              color="primary"
              className="px-6 py-3 text-white font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              {!edit ? "Create Event" : "Update Event"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Index;
