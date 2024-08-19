import styles from "./styles.module.scss";

interface ButtonProps {
  type: "primary" | "disabled" | "outline" | "cancel";
  label: any;
  onClick?: () => void;
}

export const CustomButton = ({
  type,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles["custom-button"]} ${styles[type]}`}
      {...props}
    >
      {label}
    </button>
  );
};
