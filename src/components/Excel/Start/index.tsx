import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import ExcelEmptyIcon from "@/assets/images/icons/ic-excel_empty.svg";

export const Start = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1119);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles["start-wrap"]}>
      <div>
        <ExcelEmptyIcon width="11.6rem" height="10.4rem" className="m-auto" />
        {isMobile ? (
          <p className="text-[1.8rem] text-center font-semibold pt-6">
            내 PC에서 파일을 첨부해주세요.
          </p>
        ) : (
          <p className="text-[1.8rem] text-center font-semibold pt-6">
            <b className="text-[2rem] text-primary">내 PC에서 첨부</b>
            하거나 문서를 드래그하여 넣어주세요..
          </p>
        )}
      </div>
      <div className={`${"pc-only"} ${styles.divider}`}>
        <p className="text-[1.4rem] text-center text-gray-2">또는</p>
      </div>
      <div>
        <Button variant="choice" label="파일 선택" />
      </div>
    </div>
  );
};
