import { CustomIcon } from "@/components/CustomIcon";
import styles from "./styles.module.scss";

export const Output = ({ desktop }: { desktop: boolean }) => {
  const handleOnClickButton = () => {
    console.log("click");
  };

  return (
    <div className={styles["output-wrap"]}>
      <section>
        <div className={styles["output-result"]}>
          djkfakhdfkajhsdkfjhakdhsfakhdsfkadhsfafkakdfhakdfhadjkfhsakjfhaksdfhkadfhsjhasdkfhkahsdfkahsdfakdhfkashdfkahsdfakdhsfkashdfakhdfkajdhsfklahdfkhaskfhaskjdfhaksfhaljkdfhk
        </div>
        <button className={styles["button"]} onClick={handleOnClickButton}>
          {desktop ? (
            "복사"
          ) : (
            <CustomIcon iconType={"copy"} size={"m"} stroke="white" />
          )}
        </button>
      </section>
    </div>
  );
};
