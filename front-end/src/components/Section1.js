import React from 'react'
import {Link} from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="AboutUsBg">
            <div className="container">
            <div className="row py-5">
                <div className="col-12 text-center">
                    <p className="display-5 text-white">BEST TRADE IN THE WORLD'S</p>
                    <p className="lead pt-3 pb-5 text-white">Fastest Growing Marketing For Used And New Aerospace Parts. Fastest Growing Marketing For Used And New Aerospace Parts. Fastest Growing Marketing For Used And New Aerospace Parts. Fastest Growing Marketing For Used And New Aerospace Parts. Fastest Growing Marketing For Used And New Aerospace Parts. Fastest Growing Marketing For Used And New Aerospace Parts.</p>
                    <Link to="/register" type="button" class="btn Shadow btn-secondary btn-lg">Register Now</Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AboutUs