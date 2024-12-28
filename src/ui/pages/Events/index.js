import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import CardComponent from "../../components/Card";

const Index = () => {
  const { eventData } = useSelector((state) => state.user);
  const filterEvent = eventData.filter((item) => {
    const eventDate = moment(item?.eventdate, "DD MMM YYYY");
    const today = moment();
    return eventDate.isSameOrAfter(today, "day");
  });

  return (
      <div className="flex  py-8  flex-wrap justify-evenly gap-8 px-8">
        {filterEvent.length ? (
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
