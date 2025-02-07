import { gql } from "@apollo/client";

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($userData: forgotPasswordInput!) {
    forgotPassword(userData: $userData) {
      email
    }
  }
`;
