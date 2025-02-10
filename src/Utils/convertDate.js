import moment from "moment";

export const convertDate = (date) => {
    if (!date) return [];
    if (date.eventdate) {
      return [{
        ...date,
        eventdate: moment(parseInt(date.eventdate)).format("DD MMM YYYY"),
      }];
    }
    if (Array.isArray(date)) {
      return date.map((event) => ({
        ...event,
        eventdate: event.eventdate
          ? moment(parseInt(event.eventdate)).format("DD MMM YYYY")
          : null,
      }));
    }
    if (typeof date === "object") {
      const arrayProperty = Object.values(date).find(Array.isArray);
      if (arrayProperty) {
        return arrayProperty.map((event) => ({
          ...event,
          eventdate: event.eventdate
            ? moment(parseInt(event.eventdate)).format("DD MMM YYYY")
            : null,
        }));
      }
    }
    return [];
  };