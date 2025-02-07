import React, { useState } from "react";
import { Input } from "reactstrap";
import Table from "../../components/Table";
import { userTable } from "../../components/Constant";
import { useDispatch } from "react-redux";
import ConfirmationModal from "../../components/Alert";
import { toast } from "react-toastify";

const Index = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("users"));
  const newUser = user.filter((item) => item.role !== "admin");
  const [data, setData] = useState(newUser);

  const handleChange = (e) => {
    const newData = newUser.filter(row => 
      row.fname?.toLowerCase().includes(e.target.value?.toLowerCase())
    );
    setData(newData);
  }

  const deleteUser = (row) => {
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
          const deleteUser = {...row, isDeleted: true}
          console.log(deleteUser)
          dispatch({ type: "EDIT_USER", payload: { data: deleteUser } });
        });
      } else {
        toast.error("User not deleted");
      }
    });
  };

  // Add status column to the existing user table columns
  const columnsWithStatus = [
    ...userTable,
    {
      name: "Status",
      selector: row => row.isDeleted ? "Inactive" : "Active",
      cell: row => (
        <span className={`px-2 py-1 rounded text-xs ${row.isDeleted ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
          {row.isDeleted ? "Inactive" : "Active"}
        </span>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between mt-4 space-x-4">
        <Input
          type="text"
          placeholder="Search User"
          onChange={handleChange}
          className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="my-5">
        <Table
          columns={columnsWithStatus}
          data={data || []}
          deleteData={deleteUser}
        />
      </div>
    </div>
  );
};

export default Index;
