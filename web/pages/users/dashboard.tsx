import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

import Nft from "../../components/ntf/nft";
import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
import styles from "../../styles/Dashboard.module.scss"
const Dashboard = () =>{
    const [ownedProducts, setOwnedProducts] = useState<products[]>([]);
    return(
        <div>
        <Head>
          <title>Kekigible|DashBoard</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <Navbar />
        </header>
        <main className={styles.main}>
            <section className={styles.topSection}>
            <Link href="./addProduct"><p className={styles.addProdbtn}>+ Claim a Product</p></Link>
            <form action="#" className={styles.form}>
                <Input id='search' type="text" label="Search for a product"></Input>
                <input type="submit" value="Go" />
            </form>
            </section>
            <section className={styles.product}>
                    {ownedProducts.map((product) =>{
                       return <Nft key={product.productId} {...product}></Nft> 
                    })}
            </section>
        </main>
        </div>
    )
}

export default Dashboard;