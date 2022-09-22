import Head from "next/head";
import Image from "next/image";
import Bodycomponent from "../components/body/body";
import Footercomponent from "../components/footer/footer";
import Headercomponent from "../components/header/header";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function Home({ faq }) {
  return (
    <>
      <Head>
        <title>MexerCoin</title>
        <meta
          name="description"
          content="Mexer coin cryptocurrency Investment Website"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Headercomponent />
      <Bodycomponent faq={faq} />
      <Footercomponent />
    </>
  );
}

export async function getStaticProps(context) {
  try {
    let faq = await axios.get(
      "https://maxercoin.com/api/admin/updateinfo/faqs"
    );
    faq = faq.data.items;
    console.log(faq);
    return {
      props: {
        faq,
      },
      revalidate: 1,
    };
  } catch (e) {
    return {
      props: {
        faq: [],
      },
      revalidate: 1,
    };
  }
}
