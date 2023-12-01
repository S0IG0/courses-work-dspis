import {Category} from "@api/graphql/types/types.ts";
import {useState} from "react";

interface Props {
    className?: string | undefined;
    category: Category
    editCategory: (category: Category) => void
    deleteCategory: (id: any) => void
}

export const CategoryCard = ({category, editCategory, deleteCategory, className}: Props) => {

    const [newCategory, setNewCategory] = useState<Category>(category)


    return (
        <div className={"card " + className}>
            <div className="card-header">
                <input
                    className="form-control rounded-3"
                    type="text"
                    value={newCategory.name}
                    onChange={event => {
                        const temp = {...newCategory, name: event.target.value}
                        setNewCategory(temp)
                        editCategory(temp)
                    }}
                />
            </div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    Id {newCategory.id}
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    Created {new Date(newCategory.created).toLocaleString()}
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    Updated {new Date(newCategory.updated).toLocaleString()}
                </h6>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteCategory(newCategory.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}