import React from "react";
import { Input } from "reactstrap";
import Table from "../../components/Table";
import { userTable } from "../../components/Constant";

const index = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const deleteUser = (id) => {
    console.log("Delete Event:", id);
  };
  return (
    <div>
      <div className="flex justify-between mt-4 space-x-4">
        <Input
          type="text"
          placeholder="Search User"
          className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="my-5">
        <Table columns={userTable} data={user || []} deleteData={deleteUser} />
      </div>
    </div>
  );
};

export default index;
