import { gql } from "@apollo/client";

export const PARTICIPATE = gql`
  mutation Participate($participateNew: participateInput!) {
    createParticipate(participateNew: $participateNew) {
      eventId {
        _id
      }
      ticketQuantity
      ticketRate
      ticketType
      totalamount
    }
  }
`;
