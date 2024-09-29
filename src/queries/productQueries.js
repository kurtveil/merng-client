import { gql } from "@apollo/client";

const GET_PRODUCTS = gql `
    query getProduct{
        products {
            id
            name
            description
            amount
            price
            image
        }
    }
`;

const GET_PRODUCT = gql `
    query getProduct($id:ID!) {
        project(id: $id){
            id 
            name
            description
            amount
            price
            image
        }
    }
 `;

export { GET_PRODUCTS, GET_PRODUCT};