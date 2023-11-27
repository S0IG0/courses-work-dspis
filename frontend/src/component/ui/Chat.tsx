import React, {useRef, useState, KeyboardEvent, useEffect, useCallback} from "react";
import {gql, useMutation, useSubscription} from "@apollo/client";
import {SendMessageMutation} from "@api/mutation";
import ColorHash from 'color-hash';
import {v1 as uuid} from "uuid";
import {Transition, TransitionGroup} from "react-transition-group";
import "@ui/css/animate-chat.css"

const colorHash = new ColorHash();


const clientId = uuid();
const clientColor = colorHash.hex(clientId);

interface Data {
    sendMessage: string
}

interface Message {
    clientId: string,
    text: string,
    color: string,
    username: string,
    isMy: boolean
}

export function Chat() {

    const btn = useRef<HTMLButtonElement>(null);
    const inputMessage = useRef(null);
    const [text, setText] = useState("");
    const [username, setUsername] = useState("anonymous")

    useEffect(() => {
        console.log(localStorage)
        const data = localStorage.getItem("username");
        if (data) {
            setUsername(data);
        }
    }, []);

    const updateLocalStorage = useCallback(() => {
        if (username !== "anonymous") {
            localStorage.setItem("username", username)
        }
    }, [username]);

    useEffect(() => {
        updateLocalStorage();
    }, [updateLocalStorage]);

    const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            btn?.current?.click();
        }
    };


    const [mutateFunction, {loading}] = useMutation<Data>(SendMessageMutation)


    const sendMessage = () => {
        mutateFunction({
            variables: {
                message: JSON.stringify(
                    {
                        clientId: clientId,
                        text: text,
                        color: clientColor,
                        username: username,
                    }
                ),
            }
        }).then(() =>
            setText("")
        );
    }


    const [messages, setMessages] = useState<Message[]>([]);

    const {data} = useSubscription(gql`subscription Messages { messages }`);

    React.useEffect(() => {
        if (data && data.messages) {
            const temp = JSON.parse(data.messages)
            setMessages((prevMessages) =>
                [...prevMessages, {...temp, isMy: temp.clientId !== clientId}]
            );
        }
    }, [data]);


    const scrollingDivRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollingDivRef.current) {
            scrollingDivRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    return (
        <div className="m-2">
            <div className="m-auto" style={{minWidth: "300px", maxWidth: "1000px"}}>

                <div className="usernmame mb-4">
                    <label className="form-label">You username for all users</label>
                    <input
                        className="form-control w-50"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>

                <div
                    className="card w-100 m-auto mb-4 overflow-auto"
                    style={{
                        minWidth: "300px",
                        minHeight: "400px",
                        maxHeight: "400px"
                    }}
                >
                    <TransitionGroup
                        className="ms-2 me-2 mt-1 mb-4 d-flex flex-column">
                        {messages.map((message, index) => (
                            <Transition
                                key={index}
                                in={index === messages.length - 1}
                                timeout={1000}
                            >
                                {state => (
                                    <div
                                        key={index}
                                        className={`message ${message.isMy ? "my" : "not-my"} mt-2 p-2 rounded-2 position-relative align-self-${message.isMy ? "start" : "end"} ${state}`}
                                        style={{
                                            backgroundColor: `${message.color}30`,
                                            maxWidth: "max-content"
                                        }}
                                    >
                                        {message.isMy ?
                                            <>
                                            <span
                                                className="badge rounded-2 me-2"
                                                style={{
                                                    backgroundColor: message.color,
                                                }}
                                            >
                                                {message.username}
                                            </span>
                                                {message.text}
                                            </>
                                            :
                                            <>
                                                {message.text}
                                                <span
                                                    className="badge rounded-2 ms-2"
                                                    style={{
                                                        backgroundColor: message.color,
                                                    }}
                                                >
                                                {message.username}
                                            </span>
                                            </>
                                        }
                                    </div>
                                )}
                            </Transition>
                        ))}
                    </TransitionGroup>
                    <div ref={scrollingDivRef}/>
                </div>
                <div className="d-flex justify-content-between">
                    <input
                        onKeyDown={handleKeypress}
                        ref={inputMessage}
                        className="form-control w-75"
                        type="text"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                    <button
                        disabled={text.trim() === ""}
                        className="btn btn-success text-nowrap ms-4"
                        onClick={sendMessage}
                        ref={btn}
                    >
                        {loading ?
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : "send message"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
