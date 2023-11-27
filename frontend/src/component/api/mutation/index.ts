import {gql} from "@apollo/client";

export const SendMessageMutation = gql(
    `mutation SendMessageMutation($message: String!) {
    sendMessage(message: $message)
}`)