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
      <div className="flex bg-[#f3f2f0] py-5 flex-wrap justify-between gap-6 px-4">
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
