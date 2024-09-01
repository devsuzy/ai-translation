import ToastProvider from "@/components/Toast";
import Layout from "@/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale= 1.0, viewport-fit=cover"
        />
      </Head>
      <RecoilRoot>
        <ToastProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </RecoilRoot>
    </>
  );
}
