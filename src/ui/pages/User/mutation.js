import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($verifyUserId: ID!) {
    verifyUser(id: $verifyUserId)
  }
`;