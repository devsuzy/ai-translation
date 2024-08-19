import { CustomIcon } from "@/components/CustomIcon";
import styles from "./styles.module.scss";

export const Input = ({ desktop }: { desktop: boolean }) => {
  const handleOnClickButton = () => {
    console.log("click");
  };

  return (
    <div className={styles["input-wrap"]}>
      <section>
        <textarea name="" id=""></textarea>
        <button className={styles["button"]} onClick={handleOnClickButton}>
          {desktop ? (
            "번역"
          ) : (
            <CustomIcon iconType={"arrowRight"} size={"m"} stroke="white" />
          )}
        </button>
      </section>
    </div>
  );
};
