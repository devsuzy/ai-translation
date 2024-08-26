import styles from "./styles.module.scss";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRecoilValue } from "recoil";
import { progressState } from "@/stores/excel";

type ProgressBarProps = {
  text: string;
  value: any;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ text, value }) => {
  const progress = useRecoilValue(progressState);
  return (
    <>
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient id={"progress"} gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={"#1384FE"} stopOpacity={0} />
            <stop offset="50%" stopColor={"#1384FE"} stopOpacity={0.2} />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles["progress-bar-wrap"]}>
        <div className={styles["progress-circle-wrap"]}>
          <div className={styles["progress-bar"]}></div>
          <CircularProgressbarWithChildren
            className={styles.CircularProgressbar}
            value={progress}
            styles={{
              path: {
                stroke: `url(#${"progress"})`,
                strokeWidth: "10",
                strokeLinecap: "round",
                fill: "none",
                transition: "stroke-dashoffset 1s linear 0s",
              },
              trail: {
                stroke: "transparent",
              },
            }}
          >
            <div className="text-[20px] text-white">{value}</div>
          </CircularProgressbarWithChildren>
        </div>
        <p className={styles["progress-text"]}>{text}</p>
      </div>
    </>
  );
};
