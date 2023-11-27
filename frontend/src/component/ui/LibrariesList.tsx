import {useQuery} from "@apollo/client";
import {FindLibraries} from "@api/query";
import {Library} from "@api/types/types.ts";
import {LibraryCard} from "@ui/LibraryCard.tsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import "@ui/css/animate-list.css"
// import {AnimateList} from "@ui/animation/AnimateList.tsx";

interface Data {
    findLibraries: Library[]
}

export const LibrariesList = () => {
    const {loading, data} = useQuery<Data>(FindLibraries)
    return (
        <>
            <TransitionGroup>
                {!loading && data?.findLibraries.map((library, index) => (
                    <CSSTransition
                        key={library.id}
                        timeout={1000}
                        classNames={index % 2 === 0 ? "from-left" : "from-right"}
                    >
                        <LibraryCard library={library}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>

            {/*{data?.findLibraries && !loading && (*/}
            {/*    <AnimateList*/}
            {/*        array={data?.findLibraries}*/}
            {/*        children={LibraryCard}*/}
            {/*    />*/}
            {/*)}*/}
        </>
    );
};