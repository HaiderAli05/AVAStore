import React from 'react'

const AdminOrders = () => {
    return (
        <section>
            <div className="container py-5">
                <h2 className="display-4 text-secondary m-0 text-center">All Orders</h2>
                <table class="table table-striped table-hover table-bordered text-secondary mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Sr. #</th>
                            <th scope="col">Order ID</th>
                            <th scope="col">User ID</th>
                            <th scope="col">User Email</th>
                            <th scope="col">Product ID</th>
                            <th scope="col">Product Title</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>12345678910</td>
                            <td>12345678910</td>
                            <td>useremail@test.com</td>
                            <td>12345678910</td>
                            <td>Product01</td>
                            <td>$10</td>
                            <td>5</td>
                            <td>$50</td>
                            <td>Under Review</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>12345678910</td>
                            <td>12345678910</td>
                            <td>useremail@test.com</td>
                            <td>12345678910</td>
                            <td>Product01</td>
                            <td>$10</td>
                            <td>5</td>
                            <td>$50</td>
                            <td>Under Review</td>
                        </tr><tr>
                            <th scope="row">3</th>
                            <td>12345678910</td>
                            <td>12345678910</td>
                            <td>useremail@test.com</td>
                            <td>12345678910</td>
                            <td>Product01</td>
                            <td>$10</td>
                            <td>5</td>
                            <td>$50</td>
                            <td>Under Review</td>
                        </tr><tr>
                            <th scope="row">4</th>
                            <td>12345678910</td>
                            <td>12345678910</td>
                            <td>useremail@test.com</td>
                            <td>12345678910</td>
                            <td>Product01</td>
                            <td>$10</td>
                            <td>5</td>
                            <td>$50</td>
                            <td>Under Review</td>
                        </tr><tr>
                            <th scope="row">5</th>
                            <td>12345678910</td>
                            <td>12345678910</td>
                            <td>useremail@test.com</td>
                            <td>12345678910</td>
                            <td>Product01</td>
                            <td>$10</td>
                            <td>5</td>
                            <td>$50</td>
                            <td>Under Review</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default AdminOrders
