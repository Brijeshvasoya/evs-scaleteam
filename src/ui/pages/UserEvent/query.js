import { gql } from "@apollo/client";

export const GET_USER_EVENT = gql`
  query GetUserEvent($searchTerm: String, $userId: ID) {
    participates(searchTerm: $searchTerm, userId: $userId) {
      _id
      eventId {
        _id
        ename
        hname
        eventdate
        hno
        address
      }
      userId {
        _id
        fname
        lname
      }
      ticketType
      ticketRate
      ticketQuantity
      totalamount
    }
  }
`;
