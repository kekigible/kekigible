import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

import noData from "../../public/images/2953962.jpg"
import Input from '../../components/input/input';
import { collections } from '../../data';
import styles from '../../styles/Dashboard.module.scss';
const Market = () =>{
const [marketcollections, setMarketcollections] = useState<collections[]>([])
    return(
        <div>
             <Head>
          <title>Kekigible|DashBoard</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
        <div className={styles.header}>
                <Link href="/users/dashboard"><p className={styles.backArrow}>&#8592;</p></Link>
                
            </div>
        </header>
        <main className={styles.main}>
            <section className={styles.topSection}>
            <form action="#" className={styles.form}>
                <Input id='search' type="text" label="Search for a product"></Input>
                <input type="submit" value="Go" />
            </form>
            </section>
            <section className={styles.product}>
                <div className={styles.nftSection}>

                    {marketcollections.length>0 ? marketcollections.map((collection) =>{
                        return(
                            <Link href={{pathname:'/market/marketProductDetail',query:{collectionId:collection.collectionId}}} key={collection.collectionId} className={styles.nftContainer}>
                           <div className={styles.nft}>
                            <img
                            src={collection.nftImageUrl}
                            alt={collection.name}
                            width={200}
                            height={200}
                            ></img>
                            <p>{collection.name}</p>
                            </div>
                       </Link>
                       ) 
                    }):
            <Image src={noData} alt="no Data" height={1800} ></Image>
        }
                </div>
            </section>
        </main>
        </div>
    )
}

export default Market;