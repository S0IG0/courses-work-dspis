import {useMutation, useQuery} from "@apollo/client";
import {findAllItemsFull} from "@api/graphql/query";
import {Item, ItemUpdate} from "@api/graphql/types/types.ts";
import {CardItem} from "@page/user/item/CardItem.tsx";
import {updateItemMutation} from "@api/graphql/mutation";

export const AllItems = () => {
    const {data} = useQuery<{ findAllItems: Item[] }>(findAllItemsFull, {pollInterval: 1000});
    const [updateMutation] = useMutation(updateItemMutation)

    function deleteItem(id: any) {
        console.log(id)
    }

    function updateItem(id: any, item: ItemUpdate) {
        updateMutation({
            variables: {
                id: id,
                ...item,
            }
        }).then(result => {
            console.log(result)
        })
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropItems"
            >
                Show Items
            </button>

            <div
                className="modal fade"
                id="staticBackdropItems"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropItemsLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropItemsLabel">Create category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {data && data.findAllItems
                                .slice()
                                .sort((a, b) => {
                                    if (new Date(a.created) > new Date(b.created)) return 1
                                    else return -1
                                })
                                .map(item => (
                                    <CardItem key={item.id} item={item} updateItem={updateItem}
                                              deleteItem={deleteItem}/>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}