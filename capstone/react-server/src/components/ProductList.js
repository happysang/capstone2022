import React from "react";
import styles from "./ProductList.module.css";

const ProductList = ({ data }) => {
  return (
    <div className={styles["products-wrapper"]}>
      <div className={styles["product-list"]}>
        {data.map((item, idx) => (
          <div className={styles["product-card"]} key={idx}>
            <a href={item.url} target="_blank">
              <div className={styles["product-img"]}>
                <img src={item.img} alt="product-image" />
              </div>
              <div className={styles["product-content"]}>
                <p className={styles.brand}>{item.brand}</p>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.price}>
                  <strong>{item.price.toLocaleString()}</strong>원
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductList);
