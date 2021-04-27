import React from 'react';
import { Link } from 'react-router-dom';
import Products from './api-data/products.js';

const SingleProduct = ({match}) => {
    const product = Products.find((p) => p._id === match.params.id)
    return (
        <div>
            <Link to="/api/products">Go Back</Link>
            <div className="Row">
                <div className="Col-md-6">
                    <img src={product.image} alt={product.title} />
                    <img src={product.image} alt="dxfgds"/>
                </div>
                <div className="Col-md-3">
                    <ul variant="flush">
                        <li>
                            <h3>{product.title}</h3>
                        </li>
                        <li>
                            Price:${product.price}
                        </li>
                        <li>
                            {product.description}
                        </li>
                    </ul>
                </div>
                <div className="Col-md-3">
                <li>
                    <div className="Row">
                        <div className="Col">
                            Status: 
                        </div>
                        <div className="Col"></div>

                    </div>
                </li>
                <li>
                    <button className="btn-block" type="button">BUY NOW</button>
                </li>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;
