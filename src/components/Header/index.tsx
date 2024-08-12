import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className={`text-center w-full h-[84px] flex justify-between items-center px-[32px] py-[18px]`}
    >
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={32}
        height={32}
        className={`desktop:w-[48px] desktop:h-[48px]`}
      />
      <h1>
        <span className="pc-only">Smart </span>AI Translator
        <span className="pc-only"> Powered</span> by ChatGPT
      </h1>
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
    </header>
  );
}
