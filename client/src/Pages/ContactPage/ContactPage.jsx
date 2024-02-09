import Ana from "../../Assets/Ana.png";
import Sara from "../../Assets/Sara.jpeg";
import javi from "../../Assets/javi.jpeg";
import { Link } from "react-router-dom";
import log from "../../Assets/log.png";
import "./contactpage.css";

function ContactPage() {
  return (
    <>
      <div className="logoContactt">
        <Link to="/">
          <img className="imgHeaderContact" src={log} alt="logo web" />
        </Link>
        <h3 className="h1Contactt">
          <span>ACCESIBLE</span> CITY
        </h3>
      </div>
      <div className="fondop">
        <section className="containerContact">
          <h2 className="titleContact">
            <span className="primary">Meet our team</span>
          </h2>
          <p className="ppp">
            This application was initially made by Sara López, Javier Romero and
            Ana Pérez.
          </p>
          <div className="gallery-wrapper">
            <figure className="gallery-item">
              <img src={Ana} alt="mi foto" className="item-image" />
              <figcaption className="item-description">
                <h2 className="name">Ana Pérez</h2>
                <span className="role"> Junior Web Developer </span>
              </figcaption>
            </figure>
            <figure className="gallery-item">
              <img src={Sara} alt="mi foto" className="item-image" />
              <figcaption className="item-description">
                <h2 className="name">Sara López</h2>
                <span className="role"> Web Developer Junior</span>
              </figcaption>
            </figure>
            <figure className="gallery-item">
              <img src={javi} alt="mi foto" className="item-image" />
              <figcaption className="item-description">
                <h2 className="name">Javier Romero</h2>
                <span className="role"> Web Developer Junior</span>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </>
  );
}

export default ContactPage;
