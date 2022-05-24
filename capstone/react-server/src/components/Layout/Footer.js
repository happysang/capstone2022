import logo from "../../assets/images/imgLogo.png";
import Container from "../../UI/Container";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div>
          <a href="#">
            <img className={styles.logo} src={logo} />
          </a>
        </div>
        <p className={styles.detail}>
          Social media validation business model canvas graphical user interface
          launch party creative facebook iPad twitter.
        </p>
        <p>All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
