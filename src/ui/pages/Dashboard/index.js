import React, { Fragment, useEffect, useState } from "react";
import { Button } from "reactstrap";
import Table from "../../components/Table";
import { useSelector } from "react-redux";
import moment from "moment";
import { eventTable, participateEventTable } from "../../components/Constant";
import CardModal from "../../components/Modal/CardModal";
import Card from "../../components/Card";
import Ticket from "../../components/Ticket";
import { useQuery } from "@apollo/client";
import { convertDate } from "../../../Utils/convertDate";
import { GET_ALL_EVENTS, GET_PARTICIPANTS } from "../Dashboard/query";

const Index = () => {
  const { activeUser } = useSelector((state) => state.user);
  const { data: getEvents, loading, error } = useQuery(GET_ALL_EVENTS);
  const { data: getParticipants } = useQuery(
    GET_PARTICIPANTS,
    { variables: { userId: activeUser?._id } },
    {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    }
  );
  const role = activeUser?.role || "";
  const [data, setData] = useState(getEvents?.events);
  const [view, setView] = useState(true);
  const [viewEvent, setViewEvent] = useState();
  const [option, setOption] = useState(eventTable);
  const [ticket, setTicket] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  useEffect(() => {
    if (role !== "admin" && getEvents?.events) {
      const events = convertDate(getEvents.events);
      setData(events);
    }
  }, [getEvents?.events, role]);

  const toggleViewModel = () => {
    setView(true);
    setTicket(false);
    setShowTicket(false);
  };
  const toggleTicketModel = () => {
    setView(true);
    setTicket(false);
  };
  const viewEventData = (row) => {
    setViewEvent(row);
    setView(false);
    setTicket(false);
  };
  const viewTicketData = (row) => {
    setViewEvent(row);
    setTicket(true);
    setView(true);
  };
  const allEvent = () => {
    const events = convertDate(getEvents.events);
    setData(events);
    setOption(eventTable);
    setShowTicket(false);
  };
  const participatedEvent = () => {
    if (!getParticipants?.participate) {
      setData([]);
      setOption(participateEventTable);
      setShowTicket(true);
      return;
    }
    const eventId = getParticipants.participate[0]?.eventId;
    const convertedEvents = convertDate(eventId);
    const filterEvents = getParticipants.participate.map((item) => ({
      ...item,
      eventId: convertedEvents[0] || null,
    }));

    setData(filterEvents);
    setOption(participateEventTable);
    setShowTicket(true);
  };
  const upComingEvent = () => {
    const filterEvent = getEvents?.events.filter((item) => {
      const eventDate = moment(item?.eventdate, "DD MMM YYYY");
      const today = moment();
      return eventDate.isSameOrAfter(today, "day");
    });
    const filterEvents = convertDate(filterEvent);
    setData(filterEvents);
    setOption(eventTable);
    setShowTicket(false);
  };

  return (
    <Fragment>
      <div className="flex justify-between mt-4 space-x-4">
        <Button
          type="submit"
          color="primary"
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
          viewData={showTicket ? viewTicketData : viewEventData}
        />
      </div>
      <CardModal
        modalOpen={!view}
        toggleModal={toggleViewModel}
        title="Event Details"
      >
        <Card item={viewEvent} toggleModal={toggleViewModel} />
      </CardModal>

      <CardModal
        modalOpen={ticket}
        toggleModal={toggleTicketModel}
        title="Ticket Details"
      >
        <Ticket item={viewEvent} toggleModal={toggleTicketModel} />
      </CardModal>
    </Fragment>
  );
};

export default Index;
