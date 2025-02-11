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
  const [options, setOptions] = useState();
  const [sort, setSort] = useState("All");
  const [data, setData] = useState();
  const [viewUserEvent, setViewUserEvent] = useState();
  const [view, setView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  const { loading, data: participate } = useQuery(GET_USER_EVENT, {
    variables: {
      searchTerm: searchTerm?.trim() || undefined,
      userId: sort !== "All" ? sort : undefined
    },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (participate?.participates && participate.participates.length > 0) {
      const userEventData = participate.participates.map((item) => ({
        ...item,
        eventId: {
          ...item.eventId,
          eventdate: moment(parseInt(item.eventId?.eventdate)).format(
            "DD MMM YYYY"
          ),
        },
      }));

      const uniqueUsers = new Set();
      const eventOption = participate.participates.reduce((acc, item) => {
        const userId = item.userId?._id;
        const userName = `${item.userId?.fname} ${item.userId?.lname}`.trim();
        
        if (userId && !uniqueUsers.has(userId)) {
          uniqueUsers.add(userId);
          acc.push({ 
            value: userId, 
            label: userName 
          });
        }
        return acc;
      }, []);
      
      setOptions([{ value: "All", label: "All" }, ...eventOption]);
      setData(userEventData);
      setDataLoading(loading);
    } else {
      setData([]);
      setOptions([{ value: "All", label: "All" }]);
    }
  }, [participate, loading, searchTerm, sort]);

  const handleChange = (e) => {
    const term = e.target.value?.toLowerCase().trim();
    setSearchTerm(term);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e?.value;
    setSort(selectedValue);
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

  if (dataLoading) {
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
          className="p-3 w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          data={data}
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
