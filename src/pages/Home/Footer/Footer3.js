import React from "react";
import "./Footer3.css";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
function Footer3() {
  return (
    <section className="footerss3">
      <div className="container">
        <div className="end">
          <div className="content">
            <h5>
              © 2025, Greenmart.com - Website system to sell necessities and
              clean food for free
            </h5>
          </div>
          <div className="socialMedia">
            <h5>Follow Us</h5>
            <div className="mxh">
              <a href="https://www.facebook.com/">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/">
                <FaSquareInstagram />
              </a>
              <a href="https://www.tiktok.com/foryou?lang=en">
                <FaTiktok />
              </a>
              <a href="https://www.youtube.com/">
                <FaYoutube />
              </a>
              <a href="https://x.com/">
                <FaSquareXTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer3;
