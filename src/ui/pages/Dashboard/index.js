import React, { Fragment } from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

const Index = () => {
  const { activeUser } = useSelector((state) => state?.user);
  const role=activeUser.role
  return (
    <Fragment>
      {(role==="Admin")?null:
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
      </div>}
    </Fragment>
  );
};

export default Index;
