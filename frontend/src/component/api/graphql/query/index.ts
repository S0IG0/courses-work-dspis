import {gql} from "@apollo/client";

export const findAllItems = gql(`
    query FindAllItems {
    findAllItems {
        id
        name
        description
        image
        price
        categories {
            id
            name
        }
    }
}`)

export const findAllMessages = gql(`
query FindAllMessages {
    findAllMessages {
        text
    }
}
`)

export const findAllCategories = gql(`
query FindAllCategories {
    findAllCategories {
        id
        created
        updated
        name
    }
}
`)

export const findAllItemsFull = gql(`
query FindAllItems {
    findAllItems {
        id
        created
        updated
        name
        description
        image
        price
        categories {
            id
            name
        }
    }
}
`)