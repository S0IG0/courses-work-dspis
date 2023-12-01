import {store} from "@store/store.ts";
import {useNavigate} from "react-router-dom";
import {NamePages, routes} from "@route/routes.tsx";
import {client} from "@api/graphql/api.ts";
import {CreateCategoryPage} from "@page/user/category/CreateCategoryPage.tsx";
import {AllCategories} from "@page/user/category/AllCategories.tsx";
import {CreateItemPage} from "@page/user/item/CreateItemPage.tsx";
import {AllItems} from "@page/user/item/AllItems.tsx";

export const PersonalAccount = () => {
    const navigate = useNavigate();

    function logout() {
        store.logout()
        navigate(routes[NamePages.HOME].path);
        client.resetStore().then(result => console.log(result));
    }


    return (
        <>
            <div className="control-panel w-100 d-flex justify-content-between">
                <h3 className="h3">Personal account</h3>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
            <div className="category d-flex mb-2">
                <div className="me-2">
                    <CreateCategoryPage/>
                </div>
                <AllCategories/>
            </div>
            <div className="category d-flex mb-2">
                <div className="me-2">
                    <CreateItemPage/>
                </div>
                <AllItems/>
            </div>
        </>
    );
}