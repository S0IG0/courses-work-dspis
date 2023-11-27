import {CSSTransition, TransitionGroup} from "react-transition-group";
import React, {FunctionComponent} from "react";
import "@ui/css/animate-list.css"


interface Props<T extends { id: string | number }> {
    array: T[];
    children: FunctionComponent<any>;
}

export function AnimateList<T extends { id: string | number }>({array, children}: Props<T>) {
    return (
        <TransitionGroup>
            {array.map((item, index) => (
                <CSSTransition
                    key={item.id}
                    timeout={1000}
                    classNames={index % 2 === 0 ? "from-left" : "from-right"}
                >
                    {React.createElement(children, {item})}
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}
