import styles from "./styles.module.scss";
import dynamic from "next/dynamic";

export const LangBar = () => {
  const Select = dynamic(() => import("@/components/Select"), { ssr: false });

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
