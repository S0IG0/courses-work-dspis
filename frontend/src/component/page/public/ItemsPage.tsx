import {useQuery} from "@apollo/client";
import {Item} from "@api/graphql/types/types.ts";
import {findAllItems} from "@api/graphql/query";

export const ItemsPage = () => {
    const {data} = useQuery<{ findAllItems: Item[] }>(
        findAllItems,
        {
            pollInterval: 1000,
        }
    )
    return (
        <div className="row">
            {data?.findAllItems && data.findAllItems.map(item => (
                <div className="card mb-2 me-2" key={item.id} style={{width: "18rem"}}>
                    <img src={item.image} className="card-img-top" alt="img"/>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="categories">
                            {item.categories.map(category => (
                                <div key={category.id}>
                                    <span className="badge bg-primary-subtle border border-primary-subtle text-primary-emphasis rounded-pill">
                                        {category.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="card-text">{item.description}</p>
                        <a href="#" className="btn btn-primary">Look</a>
                    </div>
                </div>
            ))}
        </div>
    );
}