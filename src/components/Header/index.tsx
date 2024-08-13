import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={32}
          height={32}
          className={styles.logo}
        />
      </Link>
      <h1>
        <span className="pc-only">Smart </span>AI Translator
        <span className="pc-only"> Powered</span> by ChatGPT
      </h1>
      <nav>
        <ul className={`flex items-center`}>
          <li>
            <Link
              href={"/word"}
              className={`${pathname === "/word" ? styles["active"] : ""}`}
            >
              단어<span className="pc-only">번역</span>
            </Link>
          </li>
          <li className={styles["mid-dot"]}></li>
          <li>
            <Link
              href={"/excel"}
              className={`${pathname === "/excel" ? styles["active"] : ""}`}
            >
              문서<span className="pc-only">번역</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
