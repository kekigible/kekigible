import Head from "next/head"
import Link from "next/link"

import Navbar from "../components/navbar/navbar"
import styles from "../styles/shopDashboard.module.scss"
const ShopDashboard = () =>{

    return(
        <div className={styles.container}>
        <Head>
          <title>Kekigible|Shop DashBoard</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <Navbar />
        </header>
        <main className={styles.main}>
            <section    className={styles.product}>
                <Link href="./addProduct"><p className={styles.addProdbtn}>+ Add a Product</p></Link>
            </section>
        </main>
        </div>
    )
}

export default ShopDashboard;