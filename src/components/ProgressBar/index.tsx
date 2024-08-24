import { useState } from "react";
import styles from "./styles.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProgressBar = () => {
  const [progress, setProgress] = useState(20);

  return (
    <>
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient
            id={"progress"}
            x1="43.5"
            y1="43"
            x2="-1.34369e-06"
            y2="5.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={"#1384FE"} />
            <stop offset="100%" stopColor={"#1384FE"} strokeOpacity={"0"} />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles["progress-bar"]}>
        <CircularProgressbar
          value={progress}
          text={`${progress}`}
          styles={{
            path: {
              stroke: `url(#${"progress"})`,
              strokeWidth: "4",
              strokeLinecap: "round",
              fill: "none",
              transition: "stroke-dashoffset 1s linear 0s",
            },
            trail: {
              stroke: "transparent",
            },
            text: {
              fill: "white",
            },
          }}
        />
      </div>
      <p className={styles["progress-text"]}>생성중...</p>
    </>
  );
};
