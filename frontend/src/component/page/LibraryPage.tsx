import {useParams} from "react-router-dom";
import {NotFoundPage} from "@page/NotFoundPage.tsx";
import {useQuery} from "@apollo/client";
import {FindLibrary} from "@api/query";
import {Library} from "@api/types/types.ts";

interface Data {
    findLibrary: Library
}

export function LibraryPage() {
    const {id} = useParams();
    if (!Number(id)) return <NotFoundPage/>

    const {loading, data} = useQuery<Data>(FindLibrary, {
        variables: {id: id},
    });

    return (
        <>
            {!loading && data?.findLibrary && (
                <>
                    <h5 className="card-title">{data?.findLibrary.name}</h5>
                    <h6 className="card-subtitle text-body-secondary mb-4">{data?.findLibrary.address}</h6>

                    {data.findLibrary.books.map(book => (
                        <div className="card mb-2" key={book.id}>
                            <h5 className="card-header">{book.name}</h5>
                            <div className="card-body">
                                <p className="card-text">{book.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                {book.authors.map(author => (
                                    <li className="list-group-item" key={author.id}>
                                        {author.firstName} {author.lastName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </>
            )}
        </>
    );
}