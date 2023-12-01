import {gql} from "@apollo/client";


export const SendMessageMutation = gql(
    `mutation SendMessageMutation($message: String!) {
    sendMessage(message: $message)
}`)

export const CreateCategory = gql(`mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
        id
        created
        updated
        name
    }
}
`)

export const deleteCategoryMutation = gql(`
mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
}
`)

export const updateCategory = gql(`
mutation UpdateCategory($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name) {
        id
        created
        updated
        name
    }
}
`)

export const CreateItem = gql(`
mutation CreateItem(
    $description: String!,
    $name: String!,
    $image: String!,
    $price: Float!,
    $categories: [ID!]!,
) {
    createItem(
        item: {
            description: $description
            name: $name
            categories: $categories
            image: $image
            price: $price
        }
    ) {
        id
        created
        updated
        name
        description
        image
        price
    }
}
`);

export const updateItemMutation = gql(`
mutation UpdateItem(
    $id: ID!,
    $name: String!,
    $description: String!,
    $image: String!,
    $price: Float!,
    $categories: [ID!]!,
) {
    updateItem(
        id: $id
        item: {
            name: $name
            description: $description
            categories: $categories
            image: $image
            price: $price
        }
    ) {
        id
        created
        updated
        name
        description
        image
        price
    }
}
`)