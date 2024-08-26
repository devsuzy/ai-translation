import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./styles.module.scss";
import { Generating, Start, Upload } from "@/components/Excel";

type ExcelStepType = "Start" | "Upload" | "Generating";

interface ExcelContextTypes {
  step: ExcelStepType;
  fileData?: Map<any, any>;
  fileInfo?: any;
  complete?: boolean;
}

export const EXCEL_ROW_MAP = [
  "연도",
  "시즌명",
  "상품코드",
  "색상코드",
  "색상명",
  "상품명 일본어",
  "상품 설명 일본어",
  "상품명 한글",
  "상품 설명 한글",
] as const;

export const ExcelContext = createContext<
  [ExcelContextTypes, Dispatch<SetStateAction<ExcelContextTypes>>] | undefined
>(undefined);

export const useExcelState = () => {
  const value = useContext(ExcelContext);
  if (value === undefined) {
    throw new Error("useExcelState should be used within ExcelContextProvider");
  }
  return value;
};

export default function Excel() {
  const contextState = useState<ExcelContextTypes>({
    step: "Start",
    complete: true,
  });
  return (
    <>
      <div className="flex h-[calc(100vh-var(--header-height))]">
        <div className={styles["excel-wrap"]}>
          <ExcelContext.Provider value={contextState}>
            {/* {contextState[0].step === "Start" && <Start />}
            {contextState[0].step === "Upload" && <Upload />}
            {contextState[0].step === "Generating" && <Generating />} */}
            <Generating />
          </ExcelContext.Provider>
        </div>
      </div>
    </>
  );
}
