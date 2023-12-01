import {ReactNode} from "react";
import {HomePage} from "@page/public/HomePage.tsx";
import {ItemsPage} from "@page/public/ItemsPage.tsx";
import {LoginPage} from "@page/public/LoginPage.tsx";
import {RegisterPage} from "@page/public/RegisterPage.tsx";
import {PersonalAccount} from "@page/user/PersonalAccount.tsx";
import {ChatPage} from "@page/user/ChatPage.tsx";

export enum Visibly {
    PUBLIC,
    PUBLIC_ONLY_NO_AUTH,
    PUBLIC_HIDDEN,
    AUTH,
    AUTH_HIDDEN,
}


export enum NamePages {
    HOME,
    ITEMS,
    LOGIN,
    REGISTER,
    PERSONAL_ACCOUNT,
    CHAT,
}


export interface Page {
    name: string
    path: string
    component: ReactNode
    visibly: Visibly[]
}


export const routes: { [key in NamePages]: Page } = {
    [NamePages.HOME]: {
        name: "Home",
        path: "/",
        component: <HomePage/>,
        visibly: [Visibly.PUBLIC],
    } as Page,
    [NamePages.ITEMS]: {
        name: "Items",
        path: "/items",
        component: <ItemsPage/>,
        visibly: [Visibly.PUBLIC],
    } as Page,
    [NamePages.LOGIN]: {
        name: "Login",
        path: "/login",
        component: <LoginPage/>,
        visibly: [Visibly.PUBLIC_ONLY_NO_AUTH],
    } as Page,
    [NamePages.REGISTER]: {
        name: "Register",
        path: "/register",
        component: <RegisterPage/>,
        visibly: [Visibly.PUBLIC_ONLY_NO_AUTH],
    } as Page,
    [NamePages.PERSONAL_ACCOUNT]: {
        name: "Account",
        path: "/account",
        component: <PersonalAccount/>,
        visibly: [Visibly.AUTH],
    } as Page,
    [NamePages.CHAT]: {
        name: "Chat",
        path: "/Chat",
        component: <ChatPage/>,
        visibly: [Visibly.AUTH],
    } as Page,
}

