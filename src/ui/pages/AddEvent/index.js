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
            <div>
              <Label
                className="block text-sm font-medium text-gray-700"
                for="hno"
              >
                House/Flat no/Office no/Floor no<span className="text-red-500">&#42;</span>
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
                      placeholder="Please Rate"
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
                      placeholder="Please Rate"
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
                      placeholder="Please Rate"
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
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
