import React from 'react'

const AdminDashboard = () => {
    return (
        <section>
            <div className="container py-5">
                <h2 className="display-5 text-secondary m-0 text-center">Profile</h2>
                <div className="row">
                    <div className="col-6 mx-auto">
                    <table class="table table-hover table-bordered text-secondary mt-5">
                            <thead>
                                <tr>
                                <th scope="col">Role</th>
                                <th scope="col">Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>First Name:</td>
                                    <td>John</td>
                                </tr>
                                <tr>
                                    <td>Last Name:</td>
                                    <td>Doe</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>admin@admin.com</td>
                                </tr>
                                <tr>
                                    <td>Country:</td>
                                    <td>XYZ</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard
