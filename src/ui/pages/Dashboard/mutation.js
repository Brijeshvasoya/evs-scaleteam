import { gql } from "@apollo/client";

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId)
  }
`;
