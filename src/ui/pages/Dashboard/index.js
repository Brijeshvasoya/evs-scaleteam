import React, { Fragment } from "react";
import { Button, Input } from "reactstrap";
import { useSelector } from "react-redux";

const Index = () => {
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  const role = activeUser?.role||"";
  return (
    <Fragment>
      {role === "Admin" ? (
        <div className="flex justify-between mt-4 space-x-4">
          <Input
            type="text"
            placeholder="Serch Event"
            className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button
            type="submit"
            color="primary"
            className="w-64 py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:bg-gray-500"
          >
            Add Event
          </Button>
        </div>
      ) : (
        <div className="flex justify-between mt-4 space-x-4">
          <Button
            type="submit"
            color="primary"
            className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:bg-gray-500"
          >
            Upcoming Events
          </Button>
          <Button
            type="submit"
            color="primary"
            className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:bg-gray-500"
          >
            Participated Events
          </Button>
          <Button
            type="submit"
            color="primary"
            className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:bg-gray-500"
          >
            All
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default Index;
