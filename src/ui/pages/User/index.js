import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

import Table from "../../components/Table";
import { userTable } from "../../components/Constant";
import ConfirmationModal from "../../components/Alert";
import { GET_USER } from "./query";
import { DELETE_USER, VERIFY_USER, DEACTIVE_USER } from "./mutation";
import Spinner from "../../components/Spinner";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const {
    data: userData,
    loading,
    refetch,
  } = useQuery(GET_USER, {
    variables: {
      searchTerm: searchTerm.trim() !== "" ? searchTerm : undefined,
    },
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [verifyUser] = useMutation(VERIFY_USER, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [deactiveUser] = useMutation(DEACTIVE_USER, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  useEffect(() => {
    if (!userData?.users) {
      setFilteredUsers([]);
      return;
    }

    const nonAdminUsers = userData.users.filter(
      (item) => item.role !== "admin"
    );
    const user = nonAdminUsers.map((user) => ({
      ...user,
      dob: user.dob ? moment(parseInt(user.dob)).format("DD MMM YYYY") : "N/A",
    }));
    setFilteredUsers(user);
    setDataLoading(loading);
  }, [userData, loading]);

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
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
          })
            .then(() => {
              toast.success("User deleted successfully");
              refetch();
            })
            .catch((err) => {
              toast.error(err?.message || "Failed to delete user");
            });
        });
      } else {
        toast.error("User not deleted");
      }
    });
  };

  const handleActiveUser = (row) => {
    if (row?.isVerified) {
      ConfirmationModal(
        "warning",
        "Are you sure?",
        "Deactive user",
        "Yes,Deactive it!",
        true
      ).then((result) => {
        if (result.isConfirmed) {
          ConfirmationModal(
            "success",
            "Deactive!",
            "User is Deactive",
            "ok",
            false
          ).then(() => {
            deactiveUser({
              variables: { deactiveUserId: row._id },
            })
              .then(() => {
                toast.success("User Deactive Successfully");
                refetch();
              })
              .catch((err) => {
                toast.error(err?.message || "Failed to Deactive User");
              });
          });
        }
      });
    } else {
      ConfirmationModal(
        "warning",
        "Are you sure?",
        "Active user",
        "Yes,Active it!",
        true
      ).then((result) => {
        if (result.isConfirmed) {
          ConfirmationModal(
            "success",
            "Active!",
            "User is Active",
            "ok",
            false
          ).then(() => {
            verifyUser({
              variables: { verifyUserId: row._id },
            })
              .then(() => {
                toast.success("User verified successfully");
                refetch();
              })
              .catch((err) => {
                toast.error(err?.message || "Failed to verify user");
              });
          });
        }
      });
    }
  };

  if (dataLoading) {
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
          value={searchTerm}
          placeholder="Search User"
          onChange={handleChange}
          className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="my-5">
        <Table
          columns={userTable}
          data={filteredUsers}
          deleteData={handleDeleteUser}
          loading={loading}
          handleActiveUser={handleActiveUser}
        />
      </div>
    </div>
  );
};

export default Index;
