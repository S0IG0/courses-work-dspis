import {NamePages, Page, routes, Visibly} from "@route/routes.tsx";
import {Link, NavLink} from "react-router-dom";
import {store} from "@store/store.ts";
import {observer} from "mobx-react-lite";

export const Header = observer(() => {
    const pages: Page[] = Object.keys(NamePages)
        .filter(key => !isNaN(Number(key)))
        .map(key => routes[Number(key) as NamePages])
        .filter(page => {

            if (store.isAuth && page.visibly.includes(Visibly.PUBLIC_ONLY_NO_AUTH)) {
                return false;
            }

            if (store.isAuth && (
                page.visibly.includes(Visibly.PUBLIC) ||
                page.visibly.includes(Visibly.AUTH)
            )) {
                return true;
            }

            if (
                page.visibly.includes(Visibly.PUBLIC) ||
                page.visibly.includes(Visibly.PUBLIC_ONLY_NO_AUTH
                )) {
                return true;
            }
        })
    return (
        <header>
            <nav className="navbar navbar-expand-md  border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-2" to={pages[NamePages.HOME].path}>
                        <i className="bi bi-shop"/>
                    </Link>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarCollapse">
                        <ul className="nav nav-pills me-auto mb-2 mb-md-0">
                            {pages.map(page => (
                                <li className="nav-item me-2" key={page.path}>
                                    <NavLink
                                        to={page.path}
                                        className="nav-link"
                                        aria-current="page"
                                    >
                                        {page.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
});