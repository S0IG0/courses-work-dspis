import {Category, Item, ItemUpdate} from "@api/graphql/types/types.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {findAllCategories} from "@api/graphql/query";

interface Props {
    item: Item
    updateItem: (id: any, item: ItemUpdate) => void
    deleteItem: (id: any) => void
}


export const CardItem = ({item, updateItem, deleteItem}: Props) => {
    const [itemChoice, setItemChoice] = useState<Item>(item)

    const {data} = useQuery<{ findAllCategories: Category[] }>(
        findAllCategories,
        {
            pollInterval: 1000,
        }
    );

    useEffect(() => {
        updateItem(itemChoice.id, {
            name: itemChoice.name,
            description: itemChoice.description,
            image: itemChoice.image,
            price: itemChoice.price,
            categories: itemChoice.categories.map((category) => category.id),
        });
    }, [itemChoice]);


    return (
        <div className="card mb-2">
            <div className="card-header">
                <input
                    className="form-control rounded-3"
                    type="text"
                    value={itemChoice.name}
                    onChange={event => {
                        setItemChoice({...itemChoice, name: event.target.value})
                    }}
                />
            </div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    Id {itemChoice.id}
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    Created {new Date(itemChoice.created).toLocaleString()}
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    Updated {new Date(itemChoice.updated).toLocaleString()}
                </h6>


                <div className="form-floating mb-2">
                    <textarea
                        className="form-control rounded-3"
                        id="floatingInput"
                        placeholder=""
                        style={{minHeight: "150px"}}
                        value={itemChoice.description}
                        onChange={event => {
                            setItemChoice({...itemChoice, description: event.target.value})
                        }}
                    />
                    <label htmlFor="floatingInput">Description</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="text"
                           className="form-control rounded-3"
                           id="floatingInput"
                           placeholder=""
                           value={itemChoice.image}
                           onChange={event => {
                               setItemChoice({...itemChoice, image: event.target.value})
                           }}
                    />
                    <label htmlFor="floatingInput">Image url</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="text"
                           pattern="[0-9]*"
                           className="form-control rounded-3"
                           id="floatingInput"
                           placeholder=""
                           value={itemChoice.price}
                           onChange={event => {
                               if (event.target.validity.valid) {
                                   setItemChoice({...itemChoice, price: Number(event.target.value)})
                               }
                           }}
                    />
                    <label htmlFor="floatingInput">price</label>
                </div>


                <div className="mb-2">
                    {itemChoice.categories.map(category => (
                        <span
                            key={category.id}
                            className="badge bg-primary-subtle border border-primary-subtle text-primary-emphasis rounded-pill me-2">
                                            {category.name}
                            <i
                                className="ms-2 bi bi-x-circle"
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    setItemChoice({
                                        ...itemChoice,
                                        categories: itemChoice.categories.filter(
                                            currentCategory => currentCategory !== category
                                        )
                                    })
                                }}
                            />
                            </span>
                    ))}
                </div>


                <div className="btn-group mb-2">
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
                                    onClick={() => {
                                        setItemChoice({
                                            ...itemChoice,
                                            categories: [...new Set([...itemChoice.categories, category])]
                                        })
                                    }}
                                >
                                    {category.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button
                        className="btn btn-danger"
                        onClick={() => deleteItem(itemChoice.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}