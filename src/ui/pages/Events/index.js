import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import CardComponent from "../../components/Card";
import { GET_ALL_EVENTS, GET_PARTICIPANTS } from "../Dashboard/query";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { loading, data } = useQuery(GET_ALL_EVENTS);
  const { activeUser } = useSelector((state) => state.user);
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
  const [filterEvent, setFilterEvent] = useState([]);

  const eventData = data?.events;

  useEffect(() => {
    const filterEvent = eventData?.filter((item) => {
      const eventDate = moment(parseInt(item?.eventdate));
      const today = moment();
      return eventDate.isSameOrAfter(today, "day");
    });
    setFilterEvent(filterEvent);
  }, [data]);
  const participantEventIds = getParticipants?.participate?.map((participation) => participation.eventId._id);
  const filteredEvents = filterEvent?.filter((event) => !participantEventIds?.includes(event._id));
  const formatEvent = filteredEvents?.map((event) => ({
    ...event,
    eventdate: moment(parseInt(event.eventdate)).format("DD MMM YYYY"),
  }));

  return (
    <div className="flex py-8 flex-wrap justify-start gap-8 px-8">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Spinner size={75} color="#ffffff" />
        </div>
      )}
      {formatEvent?.length ? (
        formatEvent.map((item, index) => (
          <CardComponent item={item} key={index} />
        ))
      ) : (
        <p className="text-center">No upcoming events.</p>
      )}
    </div>
  );
};

export default EventsPage;
