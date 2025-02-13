import React, { useState, useEffect, Fragment } from "react";
import { Button, Input } from "reactstrap";
import Select from "react-select";
import Table from "../../components/Table";
import AddEvent from "../AddEvent";
import Modal from "../../components/Modal";
import { useQuery, useMutation } from "@apollo/client";
import Spinner from "../../components/Spinner";
import ConfirmationModal from "../../components/Alert";
import { eventTable } from "../../components/Constant";
import { toast } from "react-toastify";
import { convertDate } from "../../../Utils/convertDate";
import { GET_ALL_EVENTS } from "../Dashboard/query";
import { DELETE_EVENT } from "../Dashboard/mutation";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("ename");
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [data, setData] = useState([]);
  const[dataloading, setDataloading] = useState(false)
  const { data: eventData, loading, error, refetch } = useQuery(GET_ALL_EVENTS, {
    variables: {
      searchTerm,
      searchField: sort,
    },
  });
  const [DeleteEvent] = useMutation(DELETE_EVENT, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  useEffect(() => {
    if (eventData?.events) {
      const events = convertDate(eventData.events);
      setData(events);
      setDataloading(loading)
    }
  }, [eventData, loading]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (modalOpen) {
      setEditEvent(null);
    }
  };

  const handleSortChange = (selectedOption) => {
    setSort(selectedOption.value);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      refetch();
    }
  };

  const editData = (event) => {
    setEditEvent(event);
    toggleModal();
  };

  const deleteEvent = (row) => {
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
          "Deleting...",
          "Please wait while the event is being deleted.",
          "ok",
          false
        ).then(() => {
          DeleteEvent({
            variables: { eventId: row._id },
          }).then(() => {
            refetch();
            toast.success("Event deleted successfully");
          }).catch((err) => {
            toast.error(err?.message || "Failed to delete event");
          });
        });
      } else {
        toast.error("Event deletion cancelled");
      }
    });
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

  const options = [
    { value: "ename", label: "Event Name" },
    { value: "hname", label: "Host Name" },
  ];

  if (dataloading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Spinner size={75} color="#ffffff" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px] text-red-500">
        Error loading events: {error.message}
      </div>
    );
  }

  return (
    <Fragment className="container mx-auto px-4 py-4">
      <div className="flex justify-between mt-8 space-x-4">
        <Input
          type="text"
          value={searchTerm}
          placeholder="Search Event"
          onChange={handleSearch}
          className="p-3 w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Select
          className="w-64 h-12 focus:ring-2 focus:ring-indigo-500"
          styles={customStyles}
          value={options.find((option) => option.value === sort)}
          onChange={handleSortChange}
          options={options}
        />
        <Button
          type="button"
          color="primary"
          onClick={toggleModal}
          className="w-64 h-12 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
        >
          Add Event
        </Button>
      </div>
      <div className="my-5">
        <Table
          columns={eventTable}
          data={data}
          editData={editData}
          deleteData={deleteEvent}
        />
      </div>

      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          title={editEvent ? "Edit Event" : "Add Event"}
        >
          <AddEvent
            toggleModal={toggleModal}
            editEvent={editEvent}
            setEditEvent={setEditEvent}
            refetch={refetch}
          />
        </Modal>
      )}
    </Fragment>
  );
};

export default Index;
