import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import { useQuery,useMutation } from "@apollo/client";
import { CheckCircle, Lock } from 'react-feather';
import moment from "moment";

import Table from "../../components/Table";
import { userTable } from "../../components/Constant";
import ConfirmationModal from "../../components/Alert";
import { GET_USER } from "./query";
import { DELETE_USER,VERIFY_USER } from "./mutation";
import Spinner from "../../components/Spinner";

const Index = () => {
  const { data: userData, loading,refetch } = useQuery(GET_USER, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [deleteUser,{loading:deleteLoading}] = useMutation(DELETE_USER,{
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [verifyUser,{loading:verifyLoading}] = useMutation(VERIFY_USER,{
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (!userData?.users) {
      setFilteredUsers([]);
      return;
    }

    const nonAdminUsers = userData.users.filter(
      (item) => item.role !== "admin"
    );
    const filtered = nonAdminUsers.filter((row) =>
      row.fname?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const user = filtered.map((user) => ({
      ...user,
      dob: user.dob
        ? moment(parseInt(user.dob)).format("DD MMM YYYY")
        : "N/A",
    }));
    setFilteredUsers(user);
    refetch();
  }, [userData, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteUser = (row) => {
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
          deleteUser({
            variables: { deleteUserId: row._id },
          }).then(() => {
            toast.success("User deleted successfully");
            refetch();
          }).catch((err) => {
            toast.error(err?.message || "Failed to delete user");
          });
        });
      } else {
        toast.error("User not deleted");
      }
    });
  };

  const handleActiveUser = (row) => {
    ConfirmationModal(
      "warning",
      "Are you sure?",
      "Active user",
      "Yes,Active it!",
      true
    ).then((result) => {
      if(result.isConfirmed){
        ConfirmationModal(
          "success",
          "Active!",
          "User is Active",
          "ok",
          false
        ).then(() => {
          verifyUser({
            variables: { verifyUserId: row._id },
          }).then(() => {
            toast.success("User verified successfully");
            refetch();
          }).catch((err) => {
            toast.error(err?.message || "Failed to verify user");
          });
        })
      }
    });
  };

  const columnsWithStatus = [
    ...userTable,
    {
      name: "Status",
      selector: (row) => (row.isDeleted ? "Deleted" : (row.isVerified ? "Active" : "Inactive")),
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.isDeleted
              ? "bg-red-200 text-red-800"
               : row.isVerified
              ? "text-green-500"
              : "text-yellow-500"
          }`}
        >
          {row.isDeleted ? "Deleted" : (row.isVerified ? <CheckCircle title="Verified"/> : <Lock title="Active" cursor="pointer" onClick={() => handleActiveUser(row)}/>)}
        </span>
      ),
    },
  ];

  if (loading||deleteLoading||verifyLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Spinner size={75} color="#ffffff" />
      </div>
    );
  }

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
          data={filteredUsers}
          deleteData={handleDeleteUser}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Index;
