import {Library} from "@api/types/types.ts";
import "@ui/css/library-card.css"
import {Link} from "react-router-dom";

interface Props {
    library: Library
}

export function LibraryCard({library}: Props) {
    return (
        <Link
            style={{textDecoration: "none"}}
            to={`/library/${library.id}`}
            className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">{library.name}</h5>
                <h6 className="card-subtitle text-body-secondary">{library.address}</h6>
            </div>
        </Link>
    );
}