import React, { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";

const Index = () => {
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <Fragment>
      <div className="w-auto pt-10 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-300 rounded-lg shadow-lg p-8">
          <CardTitle className=" font-semibold text-center text-gray-900 mb-2">
            Add Event
          </CardTitle>
          <Form>
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
                for="ename"
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
            <div>
              <Label
                className="block text-sm font-medium text-gray-700"
                for="ename"
              >
                Location Address<span className="text-red-500">&#42;</span>
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
                      placeholder="Please Enter Event"
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
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
