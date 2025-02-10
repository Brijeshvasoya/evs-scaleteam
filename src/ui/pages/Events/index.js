import React from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import CardComponent from "../../components/Card";
import { GET_ALL_EVENTS } from "../Dashboard/query";
import Spinner from "../../components/Spinner";

const EventsPage = () => {
  const { loading, data } = useQuery(GET_ALL_EVENTS);
  const eventData = data?.events;
  const filterEvent = eventData?.filter((item) => {
    const eventDate = moment(parseInt(item?.eventdate));
    const today = moment();
    return eventDate.isSameOrAfter(today, "day");
  });

  const formatEvent = filterEvent?.map((event) => ({
    ...event,
    eventdate: moment(parseInt(event.eventdate)).format("DD MMM YYYY"),
  }));

  return (
    <div className="flex  py-8  flex-wrap justify-start gap-8 px-8">
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
