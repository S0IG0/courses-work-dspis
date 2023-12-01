import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import {createClient} from "graphql-ws";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {getMainDefinition} from "@apollo/client/utilities";
import {setContext} from "@apollo/client/link/context";
import TokenService from "@service/TokenService.ts";
import {onError} from "@apollo/client/link/error";

const API_HOST = "localhost"
const API_PROTOCOL = "http"
const API_PORT = 80
const API_ENDPOINT = "graphql"


export const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/${API_ENDPOINT}`

export const httpLink = new HttpLink({
    uri: API_URL
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = TokenService.loadTokensFromLocalStorage().access;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : "",
        }
    }
});


onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
        if (networkError?.message) {
            console.log("FDFDFFFDFDF")
            console.log(networkError)
        }
    }
})


const wsLink = new GraphQLWsLink(createClient({
    url: `ws://${API_HOST}:${API_PORT}/${API_ENDPOINT}`,
}));

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
});