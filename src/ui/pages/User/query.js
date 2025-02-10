import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    users {
      _id
      fname
      lname
      email
      password
      age
      dob
      role
      isVerified
      isDeleted
      profilePicture
    }
  }
`;
