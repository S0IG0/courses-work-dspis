import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "@src/App.tsx";
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import {client} from "@api/api.ts";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </ApolloProvider>,
)
