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
  const newUser = user.filter((item) => item.role !== "Admin");
  const [data,setData]=useState(newUser);

  const handleChange=(e)=>{
    const newData=newUser.filter(row=>{
      return row.fname?.toLowerCase().includes(e.target.value?.toLowerCase())
    })
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
          dispatch({ type: "DELETE_USER", payload: { data: row } });
        });
      } else {
        toast.error("User not deleted");
      }
    });
  };
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
          columns={userTable}
          data={data || []}
          deleteData={deleteUser}
        />
      </div>
    </div>
  );
};

export default Index;
