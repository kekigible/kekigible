import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import Input from "../../components/input/input";
import { collections } from "../../data";
import styles from "../../styles/Dashboard.module.scss";
const Market = () => {
  const [marketcollections, setMarketcollections] = useState<collections[]>([]);

  const getCollections = async () => {
    try {
      const response = await axios.get("http://localhost:8000/collection");
      console.log(response);
      setMarketcollections(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  console.log(marketcollections);
  return (
    <div>
      <Head>
        <title>Kekigible|DashBoard</title>
        <meta
          name="Kekigible"
          content="Blockchain-based eCommerce warranty system using NFTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className={styles.header}>
          <Link href="/users/dashboard">
            <p className={styles.backArrow}>&#8592;</p>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.topSection}>
          <form action="#" className={styles.form}>
            <Input id="search" type="text" label="Search for a product"></Input>
            <input type="submit" value="Go" />
          </form>
        </section>
        <section className={styles.product}>
          <div className={styles.nftSection}>
            {marketcollections.map((collection) => {
              return (
                <Link
                  href={{
                    pathname: "/market/marketProductDetail",
                    query: { collectionId: collection.collectionId },
                  }}
                  key={collection.collectionId}
                  className={styles.nftContainer}
                >
                  <div className={styles.nft}>
                    <img
                      src={collection.nftImageUrl}
                      alt={collection.productName}
                      width={200}
                      height={200}
                    ></img>
                    <p>{collection.productName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Market;
