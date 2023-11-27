import {ReactNode} from "react";
import {HomePage} from "@page/HomePage.tsx";
import {LibrariesPage} from "@page/LibrariesPage.tsx";
import {LibraryPage} from "@page/LibraryPage.tsx";

export interface Page {
    name: string
    path: string
    component: ReactNode
    visibly: boolean
}

export enum NamePages {
    HOME,
    LIBRARIES,
    LIBRARY,
}

export const routes: { [key in NamePages]: Page } = {
    [NamePages.HOME]: {
        name: "Home",
        path: "/",
        component: <HomePage/>,
        visibly: true,

    } as Page,
    [NamePages.LIBRARIES]: {
        name: "Libraries",
        path: "/libraries",
        component: <LibrariesPage/>,
        visibly: true,
    } as Page,
    [NamePages.LIBRARY]: {
        name: "Library",
        path: "/library/:id",
        component: <LibraryPage/>,
        visibly: false,
    } as Page,
}

