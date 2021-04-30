import React from 'react';

const ContactUs = () => {
    return (
        <section className="py-custom">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="display-6 text-center text-secondary mb-5">Contact Us</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-secondary">
                        <p className="lead"><strong>Email: </strong> <a className="text-secondary text-decoration-none" href="mailto:admin@admin.com">avastore@gmail.com</a></p>
                        <p className="lead"><strong>Phone: </strong> <a className="text-secondary text-decoration-none" href="tel:+00000000000000">+00000000000000</a></p>
                        <p className="lead"><strong>Address: </strong> Street No. 01, abc town, xyz.</p>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default ContactUs
