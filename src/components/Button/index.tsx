import React from "react";
import { CustomIcon } from "../CustomIcon";

type ButtonProps = {
  variant?: "choice" | "cancel" | "start" | "download";
  label: string;
  icon?: any;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = "choice",
  label,
  icon,
  onClick,
}) => {
  const baseStyles =
    "flex flex-row items-center font-bold text-[1.6rem] rounded-[0.8rem] focus:outline-none";
  const variantStyles = {
    choice:
      "bg-white border border-solid border-primary text-primary px-[3rem] py-[1.4rem]",
    cancel: "bg-disable text-white px-[6.1rem] py-[1.4rem]",
    start: "bg-primary text-white px-[6.1rem] py-[1.4rem]",
    download: "bg-primary text-white shadow-xl px-[3.7rem] py-[1.4rem]",
  };

  const classes = `${baseStyles} ${variantStyles[variant]}`;

  return (
    <button className={classes} onClick={onClick}>
      {label}
      {icon && <CustomIcon iconType={icon} size={"s"} />}
    </button>
  );
};

export default Button;
