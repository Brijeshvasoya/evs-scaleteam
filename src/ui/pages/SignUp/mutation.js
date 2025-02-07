import { gql } from "@apollo/client";

export const SIGN_UP = gql`
mutation SignUpUser($userNew: userInput!) {
  createUser(userNew: $userNew) {
    age
    dob
    email
    fname
    lname
    password
  }
}
`;