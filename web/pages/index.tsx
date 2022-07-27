import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/navbar";
import { useAppContext } from "../context/context";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const { accessToken } = useAppContext();

  console.log(accessToken);
  return (
    <div className={styles.container}>
      <Head>
        <title>Kekigible</title>
        <meta
          name="Kekigible"
          content="Blockchain-based eCommerce warranty system using NFTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header>
          <Navbar></Navbar>
        </header>
        <Hero></Hero>
      </main>
    </div>
  );
};

export default Home;
