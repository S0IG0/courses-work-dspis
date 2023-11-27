import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import {createClient} from "graphql-ws";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {getMainDefinition} from "@apollo/client/utilities";

const API_HOST = "localhost"
const API_PROTOCOL = "http"
const API_PORT = 80
const API_ENDPOINT = "graphql"


export const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/${API_ENDPOINT}`

export const httpLink = new HttpLink({
    uri: API_URL
});

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
    httpLink,
);

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
});