import React, { Fragment, useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import Table from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import AddEvent from "../AddEvent";
import { toast } from "react-toastify";
import Select from "react-select";
import moment from "moment";
import { eventTable,participateEventTable } from "../../components/Constant";
import ConfirmationModal from "../../components/Alert";
import CardModal from "../../components/Modal/CardModal";
import Card from "../../components/Card";

const Index = () => {
  const dispatch = useDispatch();
  const { eventData } = useSelector((state) => state.user);
  const { activeUser } = useSelector((state) => state.user);
  const { participate } = useSelector((state) => state.user);
  const role = activeUser?.role || "";
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState();
  const [data, setData] = useState(eventData);
  const [sort, setSort] = useState();
  const [view, setView] = useState(true);
  const [viewEvent, setViewEvent] = useState();
  const [option,setOption]=useState(eventTable);

  useEffect(() => {
    if (role === "Admin") {
      setData(eventData);
    }
  }, [eventData]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setEditEvent(null);
  };

  const toggleViewModel = () => {
    setView(true);
  };

  const editEventData = (row) => {
    setEditEvent(row);
    setModalOpen(!modalOpen);
    setView(true);
  };

  const viewEventData = (row) => {
    setViewEvent(row);
    setView(false);
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

  const allEvent = () => {
    setData(eventData);
    setOption(eventTable);

  };

  const participatedEvent = () => {
    const event=participate.find((item)=>item?.id===activeUser?.id)
    setData(event?.event);
    setOption(participateEventTable);
  };

  const upComingEvent = () => {
    const filterEvent = eventData.filter((item) => {
      const eventDate = moment(item?.eventdate, "DD MMM YYYY");
      const today = moment();
      return eventDate.isSameOrAfter(today, "day");
    });
    setData(filterEvent);
    setOption(eventTable);
  };

  const options = [
    { value: "ename", label: "Event Name" },
    { value: "hname", label: "Host Name" },
    { value: "vipticket", label: "VIP Ticket" },
    { value: "vvipticket", label: "VVIP Ticket" },
    { value: "goldticket", label: "Gold Ticket" },
  ];

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
      "&:hover": {
        backgroundColor: "#f3f2f0",
      },
    }),
  };

  return (
    <Fragment>
      {role && role === "Admin" ? (
        <>
          <div className="flex justify-between mt-4 space-x-4">
            <Input
              type="text"
              placeholder="Search Event"
              onChange={handleChange}
              className=" p-3 w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Select
              className="w-64 h-12 focus:ring-2 focus:ring-indigo-500"
              styles={customStyles}
              value={options.find((option) => option.value === sort)}
              onChange={(selectedOption) => setSort(selectedOption.value)}
              options={options}
            />
            <Button
              type="submit"
              color="primary"
              onClick={toggleModal}
              className="w-64 h-12 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 "
            >
              Add Event
            </Button>
          </div>
          <div className="my-5">
            <Table
              columns={option}
              data={data || []}
              editData={editEventData}
              deleteData={deleteEvent}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between mt-4 space-x-4">
            <Button
              type="submit"
              color="primary"
              active
              className="w-full py-3 active:bg-gray-500 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-0 focus:bg-gray-500"
              onClick={allEvent}
            >
              All
            </Button>
            <Button
              type="submit"
              color="primary"
              className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-0 focus:bg-gray-500"
              onClick={upComingEvent}
            >
              Upcoming Events
            </Button>
            <Button
              type="submit"
              color="primary"
              className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-0 focus:bg-gray-500"
              onClick={participatedEvent}
            >
              Participated Events
            </Button>
          </div>
          <div className="my-5">
            <Table
              columns={option}
              data={data || []}
              viewData={viewEventData}
            />
          </div>
        </>
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
            view={view}
          />
        </Modal>
      )}

      {!view && (
        <CardModal modalOpen={!view} toggleModal={toggleViewModel}>
          <Card item={viewEvent} toggleModal={toggleViewModel} />
        </CardModal>
      )}
    </Fragment>
  );
};

export default Index;
