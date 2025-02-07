import React, { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "../../components/DatePicker";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  Form,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";

const Index = ({ toggleModal, editEvent, setEditEvent }) => {
  console.log(editEvent)
  const dispatch = useDispatch();
  const [edit, setEdit] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (editEvent) {
      setEdit(editEvent);
      setValue("ename", editEvent.ename);
      setValue("hname", editEvent.hname);
      setValue("eventdate", moment(editEvent.eventdate).toDate());
      setValue("hno", editEvent.hno);
      setValue("address", editEvent.address);
      setValue("vipticket", editEvent.vipticket);
      setValue("vvipticket", editEvent.vvipticket);
      setValue("goldticket", editEvent.goldticket);
    }
  }, [editEvent, setValue]);

  const onSubmit = (data, e) => {
      e.preventDefault();
      data.eventdate = moment(data.eventdate).format("DD MMM YYYY");

      if (!editEvent) {
        const addEvent = { ...data, id: uuidv4() };
        dispatch({ type: "ADD_EVENT", payload: { data: addEvent } });
        toast.success("Your Event Successfully Add", { autoClose: 1000 });
      } else {
        const updatedEvent = { ...data, id: edit?.id };
        console.log(updatedEvent, "updated");
        dispatch({ type: "EDIT_EVENT", payload: { data: updatedEvent } });
        toast.success("Event Edit Successfully", { autoClose: 1000 });
        setEdit(null);
        setEditEvent(null);
      }
    toggleModal();
  };

  return (
    <Fragment>
      <div className="w-auto flex items-center justify-center">
        <div
          className="max-w-md w-full rounded-lg shadow-lg p-8"
          style={{ backgroundColor: "#f3f2f0" }}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="-mt-3 mb-2">
              <Label
                className="block text-sm font-medium text-gray-700"
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
            <div className="mb-2">
              <Label
                className="block text-sm font-medium text-gray-700"
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
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.hname && (
                      <FormText className="text-red-500">
                        {errors.hname.message}
                      </FormText>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-2">
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
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={
                      edit?.eventdate ? moment(edit?.eventdate).toDate() : value
                    }
                  />
                )}
              />
              {errors?.eventdate && (
                <FormText className="text-red-500">
                  {errors.eventdate.message}
                </FormText>
              )}
            </div>

            <div className="mb-2">
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
                rules={{ required: "Require House/Flat no/Office no/Floor no" }}
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

            <div className="mb-2">
              <Label
                className="block text-sm font-medium text-gray-700"
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
            <div className="flex justify-between mb-2">
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
            </div>
            <div className="flex justify-between mb-2">
              <Controller
                name="vipticket"
                control={control}
                rules={{ required: "Enter your VIP ticket rate" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="vipticket"
                    placeholder="VIP Ticket Rate"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              />
              <Controller
                name="vvipticket"
                control={control}
                rules={{ required: "Enter your VVIP ticket rate" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="vvipticket"
                    placeholder="VVIP Ticket Rate"
                    className="mt-2 p-3 mx-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              />
            </div>
            <div className="mb-2">
              <Label
                className="block text-sm font-medium text-gray-700"
                for="goldticket"
              >
                GOLD Ticket<span className="text-red-500">&#42;</span>
              </Label>
              <Controller
                name="goldticket"
                control={control}
                rules={{ required: "Enter your Gold ticket rate" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="goldticket"
                    placeholder="Gold Ticket Rate"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              />
            </div>

            <Button
              type="submit"
              color="primary"
              block
              className="w-full py-0 h-12 text-white font-medium rounded-lg bg-slate-800 hover:bg-sl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
               {!edit ? "Submit" : "Edit" }
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
