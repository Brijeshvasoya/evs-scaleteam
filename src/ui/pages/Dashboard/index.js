import React, { Fragment, useState } from "react";
import { Button, Input } from "reactstrap";
import Table from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import AddEvent from "../AddEvent";
import { eventTable } from "../../components/Constant";
import ConfirmationModal from "../../components/Alert";
import { toast } from "react-toastify";
import Select from "react-select";

const Index = () => {
  const dispatch = useDispatch();
  const { eventData } = useSelector((state) => state.user);
  const { activeUser } = useSelector((state) => state.user);
  const role = activeUser?.role || "";
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState();
  const [data, setData] = useState(eventData);
  const [sort, setSort] = useState();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setEditEvent(null);
  };

  const editEventData = (row) => {
    setEditEvent(row);
    setModalOpen(!modalOpen);
  };
  const handleChange = (e) => {
    const newData = eventData.filter((row) => {
      return row[sort].toLowerCase().includes(e.target.value.toLowerCase());
    });
    setData(newData);
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
          "Deleted!",
          "Employee has been deleted.",
          "ok",
          false
        ).then(() => {
          dispatch({ type: "DELETE_EVENT", payload: { data: row } });
        });
      } else {
        toast.error("Event not deleted");
      }
    });
  };

  const options = [
    { value: "ename", label: "Event Name" },
    { value: "hname", label: "Host Name" },
    { value: "vipticket", label: "VIP Ticket" },
    { value: "vvipticket", label: "VVIP Ticket" },
    { value: "goldticket", label: "Gold Ticket" },
  ];

  return (
    <Fragment>
      {role === "Admin" ? (
        <>
          <div className="flex justify-between mt-4 space-x-4">
            <Input
              type="text"
              placeholder="Search Event"
              onChange={handleChange}
              className="mt-2 p-3 w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Select
              className="w-full mt-2 h-12"
              value={options.find((option) => option.value === sort)}
              onChange={(selectedOption) => setSort(selectedOption.value)}
              options={options}
            />
            <Button
              type="submit"
              color="primary"
              onClick={toggleModal}
              className="w-64 py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 "
            >
              Add Event
            </Button>
          </div>
          <div className="my-5">
            <Table
              columns={eventTable}
              data={data || []}
              editData={editEventData}
              deleteData={deleteEvent}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-between mt-4 space-x-4">
          <Button
            type="submit"
            color="primary"
            className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:bg-gray-500"
          >
            Upcoming Events
          </Button>
          <Button
            type="submit"
            color="primary"
            className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:bg-gray-500"
          >
            Participated Events
          </Button>
          <Button
            type="submit"
            color="primary"
            className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:bg-gray-500"
          >
            All
          </Button>
        </div>
      )}
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          title={!editEvent ? "Add Event" : "Edit Event"}
          type="submit"
        >
          <AddEvent
            toggleModal={toggleModal}
            editEvent={editEvent}
            setEditEvent={setEditEvent}
          />
        </Modal>
      )}
    </Fragment>
  );
};

export default Index;
