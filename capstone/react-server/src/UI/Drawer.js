import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as IconClose } from "../assets/icons/iconClose.svg";
import styles from "./Drawer.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const DrawerOverlay = (props) => {
  return (
    <div className={styles.drawer}>
      <div className={styles.content}>{props.children}</div>
      <button className={styles.button} onClick={props.onClose}>
        <IconClose />
      </button>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Drawer = (props) => {
  console.log(props.isOpened);
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop isOpened={props.isOpened} onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <DrawerOverlay isOpened={props.isOpened} onClose={props.onClose}>
          {props.children}
        </DrawerOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Drawer;
