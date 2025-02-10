export const convertDate = (date) => {
    if (!date) return [];
    if (date.eventdate) {
      return [{
        ...date,
        eventdate: parseInt(date.eventdate), // Keep as timestamp
      }];
    }
    if (Array.isArray(date)) {
      return date.map((event) => ({
        ...event,
        eventdate: event.eventdate
          ? parseInt(event.eventdate) // Keep as timestamp
          : null,
      }));
    }
    if (typeof date === "object") {
      const arrayProperty = Object.values(date).find(Array.isArray);
      if (arrayProperty) {
        return arrayProperty.map((event) => ({
          ...event,
          eventdate: event.eventdate
            ? parseInt(event.eventdate) // Keep as timestamp
            : null,
        }));
      }
    }
    return [];
  };