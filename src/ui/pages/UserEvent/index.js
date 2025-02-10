import React, { Fragment, useEffect, useState } from "react";
import { Input } from "reactstrap";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { GET_USER_EVENT } from "./query";
import moment from "moment";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import { userParticipateEventTable } from "../../components/Constant";
import CardModal from "../../components/Modal/CardModal";
import UserEvent from "../../components/UserEventCard";

const Index = () => {
  const { loading, data: participate } = useQuery(GET_USER_EVENT);
  const [options, setOptions] = useState();
  const [sort, setSort] = useState("fname");
  const [data, setData] = useState();
  const [sortData, setSortData] = useState();
  const [viewUserEvent, setViewUserEvent] = useState();
  const [view, setView] = useState(false);

  useEffect(() => {
    if (participate) {
      const newData = participate?.participates.map((item) => ({
        ...item,
        eventId: {
          ...item.eventId,
          eventdate: moment(parseInt(item.eventId?.eventdate)).format(
            "DD MMM YYYY"
          ),
        },
      }));
      setData(newData);
      setSortData(newData);

      const uniqueUsers = new Set();
      const eventOption = participate?.participates.reduce((acc, item) => {
        const { userId } = item;
        if (userId && !uniqueUsers.has(userId._id)) {
          uniqueUsers.add(userId._id);
          acc.push({
            value: userId._id,
            label: `${userId.fname} ${userId.lname}`,
          });
        }
        return acc;
      }, []);
      setOptions([{ value: "All", label: "All" }, ...eventOption]);
    }
  }, [participate]);

  const handleChange = (e) => {
    const searchTerm = e.target.value?.toLowerCase().trim();
    if (!searchTerm) {
      setData(sortData);
      return;
    }
    const newData = sortData?.filter((row) => {
      const searchFields = [
        row?.ename?.toLowerCase(),
        row?.eventId?.hname?.toLowerCase(),
        row?.userId?.fname?.toLowerCase(),
        row?.userId?.lname?.toLowerCase(),
        row?.eventId?.address?.toLowerCase(),
      ];
      return searchFields.some((field) => field && field.includes(searchTerm));
    });
    setData(newData);
  };
  const handleSelectChange = (e) => {
    if (e.value === "All") {
      setData(sortData);
    } else {
      const newData = sortData?.filter((row) => {
        return row.userId._id === e.value;
      });
      setData(newData);
    }
    setSort(e?.value);
  };
  const toggleModal = () => {
    setView(false);
  };
  const viewData = (row) => {
    setViewUserEvent(row);
    setView(true);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? "0 0 0 2px #6366f1" : "none",
      minHeight: 48,
      height: 48,
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isFocused ? "#f3f2f0" : "",
      color: state.isFocused ? "#2d3748" : "",
      "&:hover": {
        backgroundColor: "#f3f2f0",
      },
    }),
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Spinner size={75} color="#ffffff" />
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex justify-between mt-4 space-x-4">
        <Input
          type="text"
          placeholder="Search By Event Name"
          onChange={handleChange}
          className=" p-3 w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Select
          className="w-80 h-12 focus:ring-2 focus:ring-indigo-500"
          styles={customStyles}
          value={options?.find((option) => option?.value === sort)}
          onChange={handleSelectChange}
          options={options}
          placeholder="Search By User Name"
        />
      </div>
      <div className="my-5">
        <Table
          columns={userParticipateEventTable}
          data={data || []}
          viewData={viewData}
        />
      </div>
      {view && (
        <CardModal modalOpen={view} toggleModal={toggleModal}>
          <UserEvent item={viewUserEvent} toggleModal={toggleModal} />
        </CardModal>
      )}
    </Fragment>
  );
};

export default Index;
