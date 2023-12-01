import {useMutation} from "@apollo/client";
import {CreateCategory} from "@api/graphql/mutation";
import {Category} from "@api/graphql/types/types.ts";
import {useState} from "react";
import {Spinner} from "@ux/loader/Spinner.tsx";


interface Data {
    createCategory: Category
}

export const CreateCategoryPage = () => {
    const [mutateFunction, {loading}] = useMutation<Data>(CreateCategory);
    const [name, setName] = useState("");

    function createCategory() {
        mutateFunction({variables: {name: name}})
            .then(result => {
                console.log(result);
                setName("");
            })
    }




    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropCategory"
            >
                Create category
            </button>

            <div
                className="modal fade"
                id="staticBackdropCategory"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropCategoryLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropCategoryLabel">Create category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating">
                                <input type="text"
                                       className="form-control rounded-3"
                                       id="floatingInput"
                                       placeholder=""
                                       value={name}
                                       onChange={event => setName(event.target.value)}
                                />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={createCategory}
                            >
                                {loading ? <Spinner/> : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}