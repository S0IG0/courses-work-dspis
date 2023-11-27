import {gql} from "@apollo/client";


export const FindLibraries = gql(
    `query FindLibraries {
    findLibraries {
        id
        name
        address
    }
}`)

export const FindLibrary = gql(
    `query FindLibrary($id: ID!) {
    findLibrary(id: $id) {
        id
        name
        address
        books {
            id
            name
            description
            authors {
                id
                firstName
                lastName
                pseudonym
            }
        }
    }
}
`)