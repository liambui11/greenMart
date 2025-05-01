import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="Banner-container">
      <div className="banner">
        <Link className="banner__image">
          <img src="/image/slideshow/img4.jpg" alt="" />
          {/* <div className="banner__title">
            <h4 className="banner__title__1 ">Organic Meals Prepared</h4>
            <h3 className="banner__title__2 ">
              Delivered to
              <strong className="banner__title__3 "> your Home</strong>
            </h3>
            <div className="banner__title__4 ">
              Fully prepared & delivered nationwide.
            </div>
          </div> */}
        </Link>
      </div>
    </section>
  );
}

export default Banner;
