import React from 'react';
import {connect} from 'react-redux';
import {Container} from "react-bootstrap";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

import {productPlaceholder} from "../_helpers";
import {productActions} from '../_actions';
import {ProductSort} from "./ProductSort";
import {ProductCard} from "./ProductCard";

const myPlaceholder = productPlaceholder();

class ProductDeck extends React.Component {
    render() {
        const {products, favorite} = this.props;
        return (
            <main>
                <ProductSort products={products}>
                </ProductSort>
                <Container fluid className="mt-4">
                    {products.loading && products.search_started && products.search_type==='search' &&
                    <ReactPlaceholder showLoadingAnimation  customPlaceholder={myPlaceholder}/>}
                    {!products.loading && products.products_data &&
                    <div className="product-deck">
                        {products.products_data.map((product, index) => {
                            return (<ProductCard key={index} product={product} favorite={favorite}/>)
                        })}
                    </div>
                    }
                    {!products.loading && products.products_data && products.products_data.length == 0 &&
                    <div className="product-deck">
                        <img src="public/empty_product.jpg"/>
                    </div>
                    }
                </Container>
            </main>
        );
    }
}

function mapStateToProps(state) {
    const {products} = state;
    return {
        products,
    };
}

const connectedProductDeck = connect(mapStateToProps)(ProductDeck);
export {
    connectedProductDeck as ProductDeck
};
