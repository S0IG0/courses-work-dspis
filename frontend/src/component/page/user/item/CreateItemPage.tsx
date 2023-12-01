import {Spinner} from "@ux/loader/Spinner.tsx";
import {useMutation, useQuery} from "@apollo/client";
import {CreateItem} from "@api/graphql/mutation";
import {useState} from "react";
import {Category, ItemInput} from "@api/graphql/types/types.ts";
import {findAllCategories} from "@api/graphql/query";

export const CreateItemPage = () => {

    const [item, setItem] = useState<ItemInput>({
        name: "",
        description: "",
        image: "",
        price: 0,
        categories: [],
    })


    const [createItemMutate, {loading}] = useMutation(CreateItem);
    const [choicesCategories, setChoicesCategories] = useState<Category[]>([])

    const {data} = useQuery<{ findAllCategories: Category[] }>(
        findAllCategories,
        {
            pollInterval: 1000,
        }
    );

    function createItem() {
        createItemMutate({
            variables: {
                name: item.name,
                description: item.description,
                image: item.image,
                price: item.price,
                categories: choicesCategories.map(category => category.id),
            }
        }).then(result => {
            console.log(result)
            setItem({
                name: "",
                description: "",
                image: "",
                price: 0,
                categories: [],
            })
            setChoicesCategories([]);
        })
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropItem"
            >
                Create item
            </button>

            <div
                className="modal fade"
                id="staticBackdropItem"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropItemLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropItemLabel">Create item</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-2">
                                <input type="text"
                                       className="form-control rounded-3"
                                       id="floatingInput"
                                       placeholder=""
                                       value={item.name}
                                       onChange={event => setItem({...item, name: event.target.value})}
                                />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                            <div className="form-floating mb-2">
                                <textarea
                                    className="form-control rounded-3"
                                    id="floatingInput"
                                    placeholder=""
                                    style={{minHeight: "150px"}}
                                    value={item.description}
                                    onChange={event => setItem({...item, description: event.target.value})}
                                />
                                <label htmlFor="floatingInput">Description</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text"
                                       className="form-control rounded-3"
                                       id="floatingInput"
                                       placeholder=""
                                       value={item.image}
                                       onChange={event => setItem({...item, image: event.target.value})}
                                />
                                <label htmlFor="floatingInput">Image url</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="number"
                                       className="form-control rounded-3"
                                       id="floatingInput"
                                       placeholder=""
                                       onChange={event => setItem({...item, price: Number(event.target.value)})}
                                />
                                <label htmlFor="floatingInput">price</label>
                            </div>
                            <div className="card mb-2">
                                <div className="card-header">categories</div>
                                <div className="card-body">
                                    {choicesCategories.map(category => (
                                        <span
                                            key={category.id}
                                            className="badge bg-primary-subtle border border-primary-subtle text-primary-emphasis rounded-pill me-2">
                                            {category.name}
                                            <i
                                                className="ms-2 bi bi-x-circle"
                                                style={{cursor: "pointer"}}
                                                onClick={() => setChoicesCategories(choicesCategories.filter(lastCategory => lastCategory !== category))}
                                            />
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-primary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    add category
                                </button>
                                <ul className="dropdown-menu">
                                    {data && data.findAllCategories.map(category => (
                                        <li key={category.id}>
                                            <div
                                                className="dropdown-item"
                                                onClick={() => setChoicesCategories([...new Set([...choicesCategories, category])])}
                                            >
                                                {category.name}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={createItem}
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