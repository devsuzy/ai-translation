import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={32}
          height={32}
          className={`lg:w-[48px] lg:h-[48px]`}
        />
      </Link>
      <h1 className={styles.copy}>
        <span className="pc-only">Smart </span>AI Translator
        <span className="pc-only"> Powered</span> by ChatGPT
      </h1>
      <nav>
        <ul className={`flex items-center`}>
          <li>
            <Link href={"/word"}>
              단어<span className="pc-only">번역</span>
            </Link>
          </li>
          <li className={`w-[4px] h-[4px] bg-[#d9d9d9] mx-[16px]`}></li>
          <li>
            <Link href={"/excel"}>
              문서<span className="pc-only">번역</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
