import React, { useEffect } from 'react'
import './ContactCompany.css'
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
function ContactCompany() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="container">
            <div className="Contact">
                <div className="Contact__title">
                    <h2>Get In Touch</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        It is expedited, sought after, where pain and blame are truthfully invented, or conveniently welcomed.
                    </p>
                </div>
                <div className="Contact__infor">
                    <div className="Contact__infor__address">

                        <IoLocationOutline className="Contact__infor__icon" />

                        <p>120 Man Thien Street, Thu Duc City</p>
                        <h3>Come to us</h3>

                    </div>
                    <div className="Contact__infor__Phone">

                        <FiPhoneCall className="Contact__infor__icon" />

                        <p>+0123456789</p>
                        <h3>Give Us a Call</h3>
                    </div>
                    <div className="Contact__infor__email">

                        <MdOutlineMail className="Contact__infor__icon" />

                        <p>GreenMart@gmail.com</p>
                        <h3>Contact us via this email</h3>
                    </div>
                </div>
                <div className="Contact__Map">
                    <iframe
                        title="Google Maps location of GreenMart"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21912.105415222715!2d106.79488348111515!3d10.858821672810153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175275bc75f790d%3A0xeff189fa708d0e16!2zQ8O0bmcgdmnDqm4gdsSDbiBow7NhIFN14buRaSBUacOqbg!5e0!3m2!1svi!2s!4v1744114627832!5m2!1svi!2s"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 0,
                            borderRadius: '1rem',
                            padding: '3rem',
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    )
}

export default ContactCompany