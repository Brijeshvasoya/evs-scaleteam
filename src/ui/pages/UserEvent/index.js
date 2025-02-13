import React, { Fragment, useEffect, useState } from "react";
import { Input } from "reactstrap";
import { useQuery } from "@apollo/client";
import { GET_USER_EVENT } from "./query";
import moment from "moment";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import { userParticipateEventTable } from "../../components/Constant";
import CardModal from "../../components/Modal/CardModal";
import UserEvent from "../../components/UserEventCard";

const Index = () => {
  const [data, setData] = useState();
  const [viewUserEvent, setViewUserEvent] = useState();
  const [view, setView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  const { loading, data: participate } = useQuery(GET_USER_EVENT, {
    variables: {
      searchTerm: searchTerm?.trim() || undefined
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (participate?.participates && participate.participates.length > 0) {
      const userEventData = participate.participates.map((item) => ({
        ...item,
        eventId: {
          ...item.eventId,
          eventdate: moment(parseInt(item.eventId?.eventdate)).format("DD MMM YYYY"),
        },
      }));

      setData(userEventData);
      setDataLoading(loading);
    } else {
      setData([]);
    }
  }, [participate, loading, searchTerm]);
  

  const handleChange = (e) => {
    const term = e.target.value?.toLowerCase().trim();
    setSearchTerm(term);
  };

  // const handleSelectChange = (e) => {
  //   const selectedValue = e?.value;
  //   setSort(selectedValue);
  //   setSearchTerm(e?.label);
  // };

  const toggleModal = () => {
    setView(false);
  };

  const viewData = (row) => {
    setViewUserEvent(row);
    setView(true);
  };

  // const customStyles = {
  //   control: (base, state) => ({
  //     ...base,
  //     boxShadow: state.isFocused ? "0 0 0 2px #6366f1" : "none",
  //     minHeight: 48,
  //     height: 48,
  //   }),
  //   option: (base, state) => ({
  //     ...base,
  //     cursor: "pointer",
  //     backgroundColor: state.isFocused ? "#f3f2f0" : "",
  //     color: state.isFocused ? "#2d3748" : "",
  //     "&:hover": {
  //       backgroundColor: "#f3f2f0",
  //     },
  //   }),
  // };

  if (dataLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Spinner size={75} color="#ffffff" />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row mt-6 justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search By Event Name"
            onChange={handleChange}
            className="w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3"
          />
        </div>
        {/* <div className="w-80 h-12 focus:ring-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500">
          <Select
            className="w-auto"
            styles={customStyles}
            value={options?.find((option) => option?.value === sort)}
            onChange={handleSelectChange}
            options={options}
            placeholder="Search By User Name"
          />
        </div> */}
      </div>
      <div className="my-5 overflow-x-auto">
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
