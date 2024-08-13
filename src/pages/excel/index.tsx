import { Upload } from "@/components/Excel/Upload";
import styles from "./styles.module.scss";
import { Start } from "@/components/Excel";

export default function Excel() {
  return (
    <>
      <div className="flex h-[calc(100vh-var(--header-height))]">
        <div className={styles["excel-wrap"]}>
          {/* <Start /> */}
          <Upload />
        </div>
      </div>
    </>
  );
}
