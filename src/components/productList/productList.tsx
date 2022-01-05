import React, { FunctionComponent, useState } from "react";
import { Header } from "../header/header";
import { ProductItem } from "../productItem/productItem";
import { CategoryList} from "../categoryList/categoryList";
import { Product, Order } from "../../data/entities";

interface Props {
    products: Product[],
    categories: string[],
    order: Order,
    addToOrder: (product: Product, quantity: number) => void
}

export const ProductList: FunctionComponent<Props> = (props) => {

    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const selectCategory = (category: string) => {
        setSelectedCategory(category);
    }


    const productList = props.products
        .filter(p => selectedCategory === "All" || p.category === selectedCategory)
        .map(p => <ProductItem key={ p.id }
            product={ p }
            callback={ props.addToOrder } />);

    return <div>
        <Header order={ props.order } />
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 p-2">
                    <CategoryList categories={ props.categories }
                        selected={ selectedCategory }
                        selectCategory={ selectCategory } />
                </div>
                <div className="col-9 p-2">
                    { productList }
                </div>
            </div>
        </div>
    </div>
}

    