import React, { Fragment, useState } from "react";
import { Button, Input } from "reactstrap";
import Table from "../../components/Table";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import AddEvent from "../AddEvent";
import { eventTable } from "../../components/Constant";

const Index = () => {
  // const { eventData } = useSelector((state) => state.user);
  const eventData = JSON.parse(localStorage.getItem("event_data")) || [];
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  const role = activeUser?.role || "";
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent,setEditEvent]=useState();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const editEventData = (row) => {
    setEditEvent(row);
    setModalOpen(!modalOpen);
  };

  const deleteEvent = (id) => {
    console.log("Delete Event:", id);
  };

  return (
    <Fragment>
      {role === "Admin" ? (
        <>
          <div className="flex justify-between mt-4 space-x-4">
            <Input
              type="text"
              placeholder="Search Event"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              data={eventData || []}
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
          title={(!editEvent?"Add Event":"Edit Event")}
          type="submit"
        >
          <AddEvent toggleModal={toggleModal} editEvent={editEvent} />
        </Modal>
      )}
    </Fragment>
  );
};

export default Index;
