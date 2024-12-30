import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ title, subtitle, imageURL }) => (
  <section className="banner">
    <div className="content">
      <h1>{title}</h1>
      <span className="call-to-action">
        {subtitle}{" "}
        <FontAwesomeIcon
          className="call-to-action"
          icon={faLongArrowAltRight}
        />
      </span>
    </div>
    <img src={imageURL} />
  </section>
);

export default Banner;
