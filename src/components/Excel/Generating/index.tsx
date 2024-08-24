import { ProgressBar } from "@/components/ProgressBar";
import { ExcelFile } from "../ExcelFile";
import styles from "./styles.module.scss";
import Button from "@/components/Button";

export const Generating = () => {
  return (
    <div className={styles["generating-wrap"]}>
      <ExcelFile />
      <div className={styles["progress-wrap"]}>
        <ProgressBar />
      </div>
      <Button variant="cancel" label="취소" />
    </div>
  );
};
