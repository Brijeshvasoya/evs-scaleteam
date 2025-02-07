import React from "react";
import moment from "moment";
import CardComponent from "../../components/Card";
import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "../Dashboard/query";
import { Spinner } from "reactstrap";

const Index = () => {
  const { loading, error, data } = useQuery(GET_ALL_EVENTS);
  const eventData = data?.events;
  const filterEvent = eventData?.filter((item) => {
    const eventDate = moment(item?.eventdate, "DD MMM YYYY");
    const today = moment();
    return eventDate.isSameOrAfter(today, "day");
  });

  return (
    <div className="flex  py-8  flex-wrap justify-start gap-8 px-8">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Spinner size={75} color="#ffffff" />
        </div>
      )}
      {filterEvent?.length ? (
        filterEvent.map((item, index) => (
          <CardComponent item={item} key={index} />
        ))
      ) : (
        <p className="text-center">No upcoming events.</p>
      )}
    </div>
  );
};

export default Index;
