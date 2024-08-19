import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
import { CustomIcon } from "../CustomIcon";

interface SelectProps {
  optionList: {
    value: string;
    label: string;
  }[];
  className: string;
  value?: string;
}

export const Select = ({ optionList, className, value }: SelectProps) => {
  const [selectItem, setSelectItem] = useState(value || optionList[0].label);
  const dropMenuRef = useRef<any>(null);
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);

  const handleOpenDropList = () => {
    setDropMenuOpen(!isDropMenuOpen);
  };

  const handleClickItem = (v: { value: string; label: string }) => {
    setDropMenuOpen(false);
    setSelectItem(v.label);
  };

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isDropMenuOpen && !dropMenuRef.current.contains(e.target))
        setDropMenuOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isDropMenuOpen]);

  return (
    <div className={`${styles["select-box"]} ${className}`} ref={dropMenuRef}>
      <div
        className={`${styles["select-btn"]} ${
          isDropMenuOpen ? styles["on"] : ""
        }`}
        onClick={() => handleOpenDropList()}
      >
        {selectItem}
        <CustomIcon
          iconType="arrow"
          stroke="#fff"
          size="s"
          className={styles.icon}
        />
      </div>
      {isDropMenuOpen && (
        <div className={styles["select-items"]}>
          <ul>
            {optionList.map((item, idx) => {
              return (
                <li
                  key={`select-item-${idx}`}
                  value={item.value}
                  onClick={() => handleClickItem(item)}
                  className={selectItem === item.label ? styles["on"] : ""}
                >
                  {item.label}
                  {selectItem === item.label && (
                    <CustomIcon iconType="check" size="s" stroke="#007BFF" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
