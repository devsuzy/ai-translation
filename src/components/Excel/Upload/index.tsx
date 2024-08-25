import styles from "./styles.module.scss";
import Button from "@/components/Button";
import { CustomIcon } from "@/components/CustomIcon";
import { ExcelFile } from "../ExcelFile";
import { useExcelState } from "@/pages/excel";
import { useCallback } from "react";

export const Upload = () => {
  const [contextValue, setContextValue] = useExcelState();

  const handleCancle = useCallback(() => {
    setContextValue({
      step: "Start",
      fileData: undefined,
      fileInfo: undefined,
    });
  }, []);

  const handleWork = useCallback(() => {
    setContextValue((prev) => ({
      ...prev,
      step: "Generating",
    }));
  }, []);

  return (
    <div className={styles["upload-wrap"]}>
      <div className="mb-[5.6rem]">
        <ExcelFile />
      </div>
      <div className={styles["process-wrap"]}>
        <p className={styles["process-title"]}>
          다음과 같은 작업을 수행합니다.
        </p>
        <div className={styles["process-box"]}>
          <div>
            <div className={styles["img-box"]}>
              <CustomIcon iconType={"translate"} size={"l"} />
            </div>
            <div className={styles["text-box"]}>
              <span className={styles["text-title"]}>상품 정보 번역</span>
              <span className={styles["text-sub-title"]}>
                상품명과 원문내용을 <br className="pc-only" /> 한글로{" "}
                <br className="mo-only" />
                번역합니다.
              </span>
            </div>
          </div>
          <div>
            <div className={styles["img-box"]}>
              <CustomIcon iconType={"sheet"} size={"l"} />
            </div>
            <div className={styles["text-box"]}>
              <span className={styles["text-title"]}>시트 생성</span>
              <span className={styles["text-sub-title"]}>
                번역을 완료한 내용을 <br /> 새로운 시트에 생성합니다.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[0.8rem]">
        <Button variant="cancel" label="취소" onClick={handleCancle} />
        <Button variant="start" label="시작" onClick={handleWork} />
      </div>
    </div>
  );
};
