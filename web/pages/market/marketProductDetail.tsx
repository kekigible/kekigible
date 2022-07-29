import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "../../components/input/input";
import { useAppContext } from "../../context/context";
import { collections, products } from "../../data";
import styles from "../../styles/productDetail.module.scss";

const MarketProductDetail = () => {
  const [collection, setCollection] = useState<collections>();
  const [numSellItems, setNumSellItems] = useState<number>(0);

  const { accessToken } = useAppContext();

  const collectionId = new URLSearchParams(window.location.search).get("collectionId");

  const getCollections = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/collection/${collectionId}`);
      console.log(response.data);
      setCollection(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      const requestBody = {
        itemTosell: numSellItems,
        collectionId: collectionId,
      };
      console.log(requestBody);
      const response = await axios.post("http:localhost:8000/user/buy", requestBody, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div>
      <Head>
        <title>Kekigible|Add collection</title>
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
        <section className={styles.upper}>
          <div className={styles.imgSection}>
            <img
              src={collection?.nftImageUrl}
              alt={collection?.productName}
              width={300}
              height={300}
            />
            <p>{collection?.productName}</p>
          </div>
          <div className={styles.info}>
            <p>collection Name: {collection?.productName}</p>
            <p>Description: {collection?.description}</p>
            <p>Created At: {collection?.createdAt}</p>
            {collection?.warrantyAvail && <p>Warranty: {collection?.warrantyType}</p>}
            {collection?.warrantyAvail && <p>Warranty Period: {collection?.warrantyPeriod}</p>}

            <p>
              Products in Stock :
              {(collection?.numberOfProducts as number) - (collection?.soldProduct as number)}
            </p>
            <div className={styles.sellIndex}>
              <input
                type="number"
                value={numSellItems}
                id="sellItem"
                onChange={(e) => setNumSellItems(e.target.value as unknown as number)}
              />
              <button className={styles.btn} onClick={handleSubmit}>
                Buy
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MarketProductDetail;
