import { gql } from "@apollo/client";

export const SIGN_UP = gql`
mutation SignUpUser($input: userInput!) {
  createUser(input: $input) {
    age
    dob
    email
    fname
    lname
    password
  }
}
`;