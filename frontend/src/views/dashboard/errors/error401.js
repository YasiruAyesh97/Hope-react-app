import React from 'react'
import {Container,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
// img
import error404 from '../../../assets/images/error/404.png'
 const Error401 = () => {
    return (
        <>
            <div className="gradient">
                <Container>
                    <Image src={error404} className="img-fluid mb-4 w-50" alt=""/>
                    <h2 className="mb-0 mt-4 text-white">Oops! Unauthorized Access</h2>
                    <p className="mt-2 text-white">Access is Allowed Only For Registered Users</p>
                    <Link className="btn bg-white text-primary d-inline-flex align-items-center" to="/dashboard">Back to Home</Link>
                </Container>
                <div className="box">
                    <div className="c xl-circle">
                        <div className="c lg-circle">
                            <div className="c md-circle">
                                <div className="c sm-circle">
                                    <div className="c xs-circle">                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}

export default Error401;
