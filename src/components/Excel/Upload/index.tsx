import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "@/components/Button";
import IconExcel from "../../../../public/images/excel/ic-excel.png";
import IconTranslate from "../../../../public/images/excel/ic-translate.svg";
import IconSheet from "../../../../public/images/excel/ic-sheet.svg";

export const Upload = () => {
  return (
    <div className={styles["upload-wrap"]}>
      <div className="mb-[5.6rem]">
        <Image src={IconExcel} alt="icon-excel" />
      </div>
      <div className="mb-[4.5rem]">
        <p className={styles["process-title"]}>
          다음과 같은 작업을 수행합니다.
        </p>
        <div className={styles["process-box"]}>
          <div>
            <Image src={IconTranslate} alt="icon-translate" />
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
            <Image src={IconSheet} alt="icon-sheet" />
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
        <Button variant="cancel" label="취소" />
        <Button variant="start" label="시작" />
      </div>
    </div>
  );
};
