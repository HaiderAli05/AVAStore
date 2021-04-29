import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class SingleProduct extends Component {
    
    state = {
        loading: true,
        product: null
    }
    async componentDidMount () {
        // let ProductId = this.props.match.params.id;
        const { id } = this.props.match.params;
        const url = `https://avastore.herokuapp.com/api/products/${id}`;
        const response = await fetch(url);
        const res = await response.json();
        console.log(res);
        console.log(res.data.productImg)
        this.setState({product: res, loading: false});
    }
    render() {
        
        return (
            <section className="py-custom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="display-4 text-center text-secondary mb-5">Products</h2>
                        </div>
                    </div>
                    {this.state.loading || !this.state.product ? (
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="spinner-grow text-warning" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-grow text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-grow text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ): (
                        <div className="row">
                            <div className="col-md-6">
                                <iframe className="bg-white" width="100%" height="400px" frameborder="0"><img src={this.state.product.data.productImg} className="" alt=""/></iframe>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="title" className="display-6">Title:</label><br/>
                                <input className="border-0" type="text" id="title" value={this.state.product.data.title}/>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        )
    }
}

































// import React from 'react';
// import {Link, useParams} from 'react-router-dom';

// const SingleProduct = async() => {
//     function Child() {
//         let { id } = useParams();
//         let Id = {id};
//         return (
//           <>
//             {Id.id}
//           </>
//         );
//     }
    
//         let productId = Child();
//         console.log(productId)
//         const url = `https://avastore.herokuapp.com/api/products/${productId}`;
//         const response = await fetch(url);
//         const data = await response.json();
//         const product = data.data;
    
    
   
//     return (
//         <div>
//             {product.title}
//         </div>
//     )
// }

// export default SingleProduct


// // <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 my-3">
// //                     <div className="card shadow product">
// //                         <div className="card-img">
// //                             <Link to={`products/${product._id}`}><img src={product.productImg} className="card-img-top product-img" alt=""/></Link>
// //                         </div>
// //                         <div className="card-body border-top py-4">
// //                             <h5 className="card-title">{product.title}</h5>
// //                             <p className="card-text">{product.description}</p>
// //                             <p className="prod-price">Price: ${product.price}</p>
// //                             <Link to={`products/${product._id}`} className="btn btn-secondary w-100">View Details</Link>
// //                         </div>
// //                     </div>
// //                 </div>