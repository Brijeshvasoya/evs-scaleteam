import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(_id: $id) {
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
