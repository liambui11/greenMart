import { FaShippingFast } from "react-icons/fa";
import "./About.css";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-container">
      <div className="about">
        <div className="about__content">
          <p className="about__content--intro">
            <span className="highlight-text">Welcome to GreenMart</span> - Your
            Trusted Destination for a Healthy and Green Lifestyle!
          </p>
          <br />
          <p className="about__content--description">
            At GreenMart, we offer a wide range of clean, organic foods and safe
            essential products, committed to being free from harmful chemicals
            and preservatives. We understand that your health and your family's
            well-being are top priorities, which is why GreenMart carefully
            selects products from reputable suppliers to ensure high quality and
            clear origins.
          </p>
          <br />
          <p className="about__content--product">
            🌱 Our products at GreenMart include:
            <br />
            ✔️ Fresh, clean vegetables and fruits meeting VietGAP and GlobalGAP
            standards
            <br />
            ✔️ Fresh meat, fish, and seafood, ensuring food safety and hygiene
            <br />
            ✔️ Rice, grains, and organic foods that promote good health
            <br />
            ✔️ Natural beverages, spices, and daily essential goods
          </p>
          <br />
          <p className="about__content--mission">
            With the mission of “Bringing Clean Food to Every Meal”, GreenMart
            is not just an online store but also your trusted companion, helping
            you easily access safe, high-quality products at reasonable prices.
          </p>
          <br />
          <p className="about__content--ordering">
            <FaShippingFast />
            Fast Ordering
            <br />
            Home Delivery With just a few clicks, you can have fresh, clean
            products delivered to your doorstep quickly. Start living a
            healthier, greener life with GreenMart today!
          </p>
          <br />
          <p className="about__content--signature">
            Sincerely, <br />
            <span className="highlight-text">GreenMart Team</span>
          </p>
        </div>
        <div className="about__image">
          <img
            alt=""
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRAymK687EGokCfzgD9UTvy_6TQ7tvPlPw6xqgSbgvjDB3J9QQp"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default About;
