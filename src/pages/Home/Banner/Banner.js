import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="Banner-container">
      <div className="banner">
        <Link className="banner__image">
          <img src="/image/slideshow/img4.jpg" alt="" />
        </Link>
      </div>
    </section>
  );
}

export default Banner;
