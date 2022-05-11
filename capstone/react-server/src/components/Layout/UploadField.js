import Container from "../../UI/Container";
import UploadForm from "../UploadForm";
import styles from "./UploadField.module.css";

const UploadField = () => {
  return (
    <div className={styles.uploadField}>
      <Container>
        <UploadForm />
      </Container>
    </div>
  );
};

export default UploadField;
