import { gql } from "@apollo/client";

export const ADD_EVENT = gql`
  mutation AddEvent($eventNew: eventInput!) {
    createEvent(eventNew: $eventNew) {
      address
      ename
      eventdate
      hname
      hno
      _id
      ticket {
        goldticket
        vipticket
        vvipticket
      }
    }
  }
`;

export const EDIT_EVENT = gql`
  mutation EditEvent($eventId: ID!, $eventUpdate: updateEventInput!) {
    updateEvent(eventId: $eventId, eventUpdate: $eventUpdate) {
      _id
      ename
      hname
      eventdate
      hno
      address
      ticket {
        vipticket
        vvipticket
        goldticket
      }
    }
  }
`;
