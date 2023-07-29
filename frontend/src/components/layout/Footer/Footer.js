import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <section className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download our App for Android and IOS Mobile Phone</p>
        <img src={playStore} alt="playstoreicon" />
        <img src={appStore} alt="appstoreicon" />
      </section>
      <section className="midFooter">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3176/3176363.png"
          alt="mybrandlogo"
        />
        <p>High quality is our first priority</p>
        <p>Copyrights 2022 &copy; AjFuturistic</p>
      </section>
      <section className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://instagram.com">Instagram</a>
        <a href="https://youtube.com">Youtube</a>
      </section>
    </footer>
  );
};

export default Footer;
