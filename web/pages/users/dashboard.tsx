import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Nft from "../../components/ntf/nft";
import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
import styles from "../../styles/Dashboard.module.scss"
import { products } from "../../data";


const product:products={
    productId:"jhdgvs",
    productName: "MSI GF63",
    category: "Laptop",
    collectionId:"dasjh",
    description:"Lorem",
    warrantyAvail: true,
    nftSoulBound:true,
    createdAt:Date(),
    warrantyType: "Standard",
    warrantyPeriod: "2 years",
    nftPurchasable: 23,
    nftImageUrl:"https://images.pexels.com/photos/4051212/pexels-photo-4051212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    productUrl: "https://www.amazon.in/MSI-i5-10500H-Windows-GTX1650-10SC-611IN/dp/B09YTVB91N/ref=sr_1_3?crid=1BBIWE8NE82KP&keywords=msi+gf63&qid=1659013806&sprefix=msi+%2Caps%2C1238&sr=8-3",
}

const Dashboard = () =>{
    const [ownedProducts, setOwnedProducts] = useState<products[]>([product]);

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
                <form action="#" className={styles.form}>
                    <Input id="claimProduct" type="text" label="Product Id"></Input>
                    <input type="submit" value="Claim" />
                </form>
            <form action="#" className={styles.form}>
                <Input id='search' type="text" label="Search for a product"></Input>
                <input type="submit" value="Go" />
            </form>
            </section>
            <section className={styles.product}>
                <div className={styles.nftSection}>

                    {ownedProducts.map((product) =>{
                        return(
                            <Link href={{pathname:'/users/productDetail',query:{productId:product.productId}}} key={product.productId} className={styles.nftContainer}>
                           <div className={styles.nft}>
                            <img
                            src={product.nftImageUrl}
                            alt={product.productName}
                            width={200}
                            height={200}
                            ></img>
                            <p>{product.productName}</p>
                            </div>
                       </Link>
                       ) 
                    })}
                </div>
            </section>
        </main>
        </div>
    )
}

export default Dashboard;