import Header from "@/components/Header";

interface Props {
  children: any;
}

export default function Layout(props: Props) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
}
