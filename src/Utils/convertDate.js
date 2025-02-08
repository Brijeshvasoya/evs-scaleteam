export const convertDate = (date) => {
    if (!date) return [];
    if (date.eventdate) {
      return [{
        ...date,
        eventdate: new Date(parseInt(date.eventdate)).toLocaleDateString(),
      }];
    }
    if (Array.isArray(date)) {
      return date.map((event) => ({
        ...event,
        eventdate: event.eventdate 
          ? new Date(parseInt(event.eventdate)).toLocaleDateString() 
          : 'N/A',
      }));
    }
    if (typeof date === 'object') {
      const arrayProperty = Object.values(date).find(Array.isArray);
      if (arrayProperty) {
        return arrayProperty.map((event) => ({
          ...event,
          eventdate: event.eventdate
            ? new Date(parseInt(event.eventdate)).toLocaleDateString()
            : "N/A",
        }));
      }
    }
    return [];
  };