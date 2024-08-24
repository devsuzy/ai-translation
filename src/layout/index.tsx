import BackgroundEffect from "@/components/Background";
import Header from "@/components/Header";

interface Props {
  children: any;
}

export default function Layout(props: Props) {
  return (
    <>
      <BackgroundEffect />
      <Header />
      <main>{props.children}</main>
    </>
  );
}
