import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { collections, products } from "../../data";

import styles from "../../styles/productDetail.module.scss"
const MarketProductDetail = () =>{
    const   [collection,setCollection]= useState<collections>();

    const collectionId = new URLSearchParams(window.location.search).get('collectionId');

    return (
    <div>
        <Head>
          <title>Kekigible|Add collection</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <div className={styles.header}>
                <Link href="/users/dashboard"><p className={styles.backArrow}>&#8592;</p></Link>
            </div>
        </header>
        <main className={styles.main}>
            <section className={styles.upper}>
                <div className={styles.imgSection}>
                    <img src={collection.nftImageUrl} alt={collection.name} width={300} height={300} />
                    <p>{collection.name}</p>
                </div>
                <div className={styles.info}>
                    <p>collection Name: {collection.name}</p>
                    <p>Description: {collection.description}</p>
                    <p>Created At: {collection.createdAt}</p>
                    {collection.warrantyAvail && <p>Warranty: {collection.warrantyType}</p>}
                    {collection.warrantyAvail && <p>Warranty Period: {collection.warrantyPeriod}</p>}
                    
                  <button className={styles.btn} >Buy</button>

                </div>
            </section>
            </main>
    </div>
    )
}

export default MarketProductDetail;