import { gql } from "@apollo/client";

const ADD_PRODUCT = gql`
    mutation addProduct($name: String!, $description: String!,$amount: String!,$price:String!, $image: String!, $characteristics: String!,){
        addProduct(name:$name, description:$description,
            amount: $amount, price:$price, image: $image,characteristics: $characteristics){
            id
            name
            description
            amount
            price
            image
            characteristics
        }
    }
`;

const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!){
    deleteProduct(id:$id){
            id
            name
            description
            amount
            price
    }}`;

export { ADD_PRODUCT, DELETE_PRODUCT };