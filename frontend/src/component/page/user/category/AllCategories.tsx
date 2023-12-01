import {useMutation, useQuery} from "@apollo/client";
import {findAllCategories} from "@api/graphql/query";
import {Category} from "@api/graphql/types/types.ts";
import {deleteCategoryMutation, updateCategory} from "@api/graphql/mutation";
import {CategoryCard} from "@page/user/category/CategoryCard.tsx";

export const AllCategories = () => {
    const {data, loading, refetch} = useQuery<{ findAllCategories: Category[] }>(
        findAllCategories,
        {
            pollInterval: 1000,
        }
    );

    const [deleteCategoryMutate, {}] = useMutation(deleteCategoryMutation)
    const [updateCategoryMutate, {}] = useMutation(updateCategory)


    function editCategory(category: Category) {
        console.log(category)

        updateCategoryMutate({
            variables: {
                id: category.id,
                name: category.name
            }
        }).then(() => (
            refetch()
                .then(result => console.log(result))
        ))

    }

    function deleteCategory(id: any) {
        console.log(id)
        deleteCategoryMutate({
            variables: {
                id: id,
            }
        }).then(() => (
            refetch()
                .then(result => console.log(result))
        )).catch(reason => {
            console.log(reason)
        })

    }


    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropCategories"
            >
                Show categories
            </button>

            <div
                className="modal fade"
                id="staticBackdropCategories"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropCategoriesLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropCategoriesLabel">Create category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {!loading && data?.findAllCategories.map(category => (
                                <CategoryCard
                                    key={category.id}
                                    className="mb-2"
                                    category={category}
                                    deleteCategory={deleteCategory}
                                    editCategory={editCategory}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}