import { useEffect, useRef, useState } from "react";

import { useRecoilState } from "recoil";
import { languageValueState } from "@/stores/word";
import { CustomIcon } from "../CustomIcon";

import styles from "./styles.module.scss";
import { setCookie } from "cookies-next";
import { useMediaQuery } from "react-responsive";

interface SelectProps {
  optionList: {
    value: string;
    label: string;
  }[];
  className: string;
  value?: string;
}

const Select = ({ optionList, className }: SelectProps) => {
  const [selectItem, setSelectItem] = useRecoilState(languageValueState);
  const dropMenuRef = useRef<any>(null);
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const [desktop, setDesktop] = useState(false);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1120px)",
  });

  const handleOpenDropList = () => {
    setDropMenuOpen(!isDropMenuOpen);
  };

  const handleClickItem = (v: { value: string; label: string }) => {
    setDropMenuOpen(false);
    setSelectItem(v.value);
    setCookie("lang", v.value);
  };

  useEffect(() => {
    setDesktop(isDesktop);
  }, [isDesktop]);

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
        {optionList.find((obj) => obj.value === selectItem)?.label}
        <CustomIcon
          iconType="arrow"
          stroke={desktop ? "#fff" : "#000"}
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
                  className={selectItem === item.value ? styles["on"] : ""}
                >
                  {item.label}
                  {selectItem === item.value && (
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

export default Select;
