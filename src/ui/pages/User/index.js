import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import Switch from "react-switch";

import Table from "../../components/Table";
import { userTable } from "../../components/Constant";
import ConfirmationModal from "../../components/Alert";
import { GET_USER } from "./query";
import { DELETE_USER, VERIFY_USER, DEACTIVE_USER } from "./mutation";
import Spinner from "../../components/Spinner";

const Index = () => {
  const {
    data: userData,
    loading,
    refetch,
  } = useQuery(GET_USER, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [verifyUser, { loading: verifyLoading }] = useMutation(VERIFY_USER, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const [deactiveUser, { loading: deactiveLoading }] = useMutation(
    DEACTIVE_USER,
    {
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    }
  );

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
      dob: user.dob ? moment(parseInt(user.dob)).format("DD MMM YYYY") : "N/A",
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

  const columnsWithStatus = [
    ...userTable,
    {
      name: "Status",
      selector: (row) =>
        row.isDeleted ? "Deleted" : row.isVerified ? "Active" : "Inactive",
      cell: (row) => (
        row.isDeleted ? (
          <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-medium">
            Deleted
          </span>
        ) : (
          <div className="flex items-center">
            <Switch
              checked={row.isVerified}
              onChange={() => handleActiveUser(row)}
              onColor="#48bb78"
              offColor="#e53e3e"
              onHandleColor="#ffffff"
              offHandleColor="#ffffff"
              handleDiameter={18}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="mr-2"
            />
            <span className={`text-xs font-medium ${row.isVerified ? 'text-green-600' : 'text-red-600'}`}>
              {row.isVerified ? 'Active' : 'Inactive'}
            </span>
          </div>
        )
      ),
    },
  ];

  if (loading || deleteLoading || verifyLoading) {
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
