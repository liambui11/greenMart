import React, { useEffect } from "react";
import "./ContactCompany.css";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
function ContactCompany() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Contact-container">
      <div className="Contact__title">
        <h2>Get In Touch</h2>
        <p>
          Got questions or need support? The GreenMart team is here to help you
          live greener and shop smarter — reach out to us anytime!
        </p>
      </div>
      <div className="Contact__infor">
        <div className="Contact__infor__address">
          <IoLocationOutline className="Contact__infor__icon" />

          <p>97 Man Thien Street, Thu Duc City</p>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.520072541692!2d106.78408977517321!3d10.847992257869361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5nIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1745657326038!5m2!1svi!2s"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            borderRadius: "1rem",
            // padding: "3rem",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>
    </div>
  );
}

export default ContactCompany;
