import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query GetAllEvents($searchTerm: String, $searchField: String) {
    events(searchTerm: $searchTerm, searchField: $searchField) {
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

export const GET_PARTICIPANTS = gql`
  query Participate($userId: ID!) {
    participate(userId: $userId) {
      _id
      eventId {
        _id
        ename
        eventdate
        hname
        hno
        address
      }
      ticketType
      ticketRate
      ticketQuantity
      totalamount
    }
  }
`;
