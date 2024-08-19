import { Select } from "@/components/Select";
import styles from "./styles.module.scss";

export const LangBar = () => {
  return (
    <div className={styles["lang-bar"]}>
      <h3>언어감지</h3>
      <Select
        className={styles["select-box"]}
        optionList={[
          { value: "English", label: "영어" },
          { value: "Korean", label: "한국어" },
          { value: "Japanese", label: "일본어" },
        ]}
      />
    </div>
  );
};
