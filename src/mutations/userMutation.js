import { gql } from "@apollo/client";

const LOGIN_USER = gql`
    mutation getUser($email: String!, $password: String!){
        getUser(email:$email, password:$password){
            id
            email
        }
    }
`;
export{LOGIN_USER};