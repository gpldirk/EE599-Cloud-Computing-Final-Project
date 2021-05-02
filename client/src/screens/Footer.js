import React from 'react'
import logo from './res/logo.png'


const Footer = () => {

    return (
        <>  
                <footer className="row m-auto pt-5 pb-3">

                <div className="col-1"></div>
{/* 1 */}
                    <div className="col-12 col-lg-2 pt-4">
                        <div className="footer-item">
                            <ul className="footer-items">
                                <li className="foot-item-head mb-2">Why Surl?</li>
                            </ul>
                        </div>
                    </div>
{/* 2 */}
                    <div className="col-12 col-lg-2 pt-4">
                        <div className="footer-item">
                            <ul className="footer-items">
                                <li className="foot-item-head mb-2">Features</li>
                            </ul>
                        </div>
                    </div>
{/* 3 */}
                    <div className="col-12 col-lg-2 pt-4">

                        <div className="footer-item">
                            <ul className="footer-items">
                            <li className="foot-item-head mb-2">Legal</li>
                                <li className="foot-items">Privacy Policy</li>
                                <li className="foot-items">Terms of Service</li>
                            </ul>
                        </div>
                    </div>
{/* 4 */}
                    <div className="col-12 col-lg-2 pt-4">
                        <div className="footer-item">
                            <ul className="footer-items">
                            <li className="foot-item-head mb-2">Company</li>

                                <li className="foot-items">Our Team</li>
                                <li className="foot-items">Contact</li>
                            </ul>
                        </div>
                    </div>
{/* 5 */}
                    <div className="col-12 col-lg-2 pt-4 footer-end d-none d-lg-block">
                        <div className="footer-logo">
                            <img className="foot-logo" src={logo} alt="logo" width="30%"/>
                        </div>
                        <div className="row brand mt-3 mb-3">
                            © 2021 Surl Handmade in LA.
                        </div>
                    </div>

                </footer>

        </>
    )
}

export default Footer
