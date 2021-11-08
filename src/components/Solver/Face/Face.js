import styles from "./Face.module.css";

const Face = ({ side }) => {
  const colors = ["red", "green", "blue", "orange", "yellow", "white"];

  return (
    <div className={styles.grid}>
      {side.map((n, index) => {
        return (
          <div
            className={styles.square}
            key={index}
            style={{ backgroundColor: colors[n] }}
          />
        );
      })}
    </div>
  );
};

export default Face;
