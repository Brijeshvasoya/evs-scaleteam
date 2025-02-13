import React, { Fragment, useEffect, useState } from "react";
import { Button } from "reactstrap";
import Table from "../../components/Table";
import { useSelector } from "react-redux";
import moment from "moment";
import Spinner from "../../components/Spinner";
import { eventTable, participateEventTable } from "../../components/Constant";
import CardModal from "../../components/Modal/CardModal";
import Card from "../../components/Card";
import Ticket from "../../components/Ticket";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_EVENTS, GET_PARTICIPANTS } from "../Dashboard/query";

const Index = () => {
  const { activeUser } = useSelector((state) => state.user);
  const { data: getEvents, loading } = useQuery(GET_ALL_EVENTS);
  const [getParticipants, { data: getParticipantsData, loading: participantsLoading }] = useLazyQuery(
    GET_PARTICIPANTS,
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
  const [columns, setColumns] = useState(eventTable);
  const [ticket, setTicket] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [show, setShow] = useState(false);

  const formatEvents = (events) => {
    return events.map((event) => ({
      ...event,
      eventdate: moment(parseInt(event.eventdate)).format("DD MMM YYYY"),
    }));
  };

  const formatParticipants = (participants) => {
    return participants.map((participant) => ({
      ...participant,
      eventId: {
        ...participant.eventId,
        eventdate: moment(parseInt(participant.eventId?.eventdate)).format(
          "DD MMM YYYY"
        ),
      },
    }));
  };

  useEffect(() => {
    if (role !== "admin" && getEvents?.events) {
      const events = formatEvents(getEvents.events);
      setData(events);
    }
    if(getParticipantsData?.participate){
      const filterEvent = formatParticipants(getParticipantsData?.participate);
      setData(filterEvent);
      setColumns(participateEventTable);
      setShowTicket(true);
    }
  }, [getEvents?.events, role,getParticipantsData]);

  const toggleViewModel = () => {
    setView(true);
    setTicket(false);
    setShowTicket(false);
    setShow(false);
  };
  const toggleTicketModel = () => {
    setView(true);
    setTicket(false);
    setShow(false);
  };
  const viewEventData = (row) => {
    const disable = getParticipantsData?.participate?.some((item) => item.eventId._id === row._id);
    if (disable) {
      setShow(true);
    }
    setViewEvent(row);
    setView(false);
    setTicket(false);
  };
  const viewTicketData = (row) => {
    setViewEvent(row);
    setTicket(true);
    setView(true);
    setShow(false);
  };
  const allEvent = () => {
    const events = formatEvents(getEvents.events);
    setData(events);
    setColumns(eventTable);
    setShowTicket(false);
    setShow(false);
  };
  const participatedEvent = () => {
    getParticipants({ 
      variables: { userId: activeUser?._id } 
    });
    if (
      !getParticipantsData?.participate ||
      getParticipantsData.participate.length === 0
    ) {
      setData([]);
      setColumns(participateEventTable);
      setShowTicket(true);
      return;
    }
    const filterEvent = formatParticipants(getParticipantsData?.participate);
    setData(filterEvent);
    setColumns(participateEventTable);
    setShowTicket(true);
  };
  const upComingEvent = () => {
    const filterEvent = getEvents?.events.filter((item) => {
      const eventDate = moment(parseInt(item.eventdate));
      const today = moment();
      return eventDate.isSameOrAfter(today, "day");
    });
    const filterEvents = formatEvents(filterEvent);
    setData(filterEvents);
    setColumns(eventTable);
    setShowTicket(false);
  };
  if (loading || participantsLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Spinner size={75} color="#ffffff" />
      </div>
    );
  }
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
          columns={columns}
          data={data || []}
          viewData={showTicket ? viewTicketData : viewEventData}
        />
      </div>
      <CardModal
        modalOpen={!view}
        toggleModal={toggleViewModel}
        title="Event Details"
      >
        <Card item={viewEvent} toggleModal={toggleViewModel} show={show} />
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
