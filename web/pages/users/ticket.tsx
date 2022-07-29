import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Input from "../../components/input/input";
import { products } from "../../data";
import styles  from "../../styles/addProduct.module.scss"

const Ticket = () =>{
    const [product,steProduct]=useState<products>()
    const productId = new URLSearchParams(window.location.search).get('productId');

    //search for product using productId

    const handleSubmit = (e:any) =>{
        const formBody={
            ticketTitle:e.target.ticketTitle.value,
            ticketDescription:e.target.ticketDescription.value,
            collectionId: product?.collectionId,
            productId:product?.productId,
        }
    }
    return(
        <div>
            <Head>
          <title>Kekigible|Add Product</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <div className={styles.header}>
                <Link href={{pathname:'/users/productDetail',query:{productId:productId}}}><p className={styles.backArrow}>&#8592;</p></Link>
            </div>
        </header>
        <main className={styles.main}>
            <form action="#" onSubmit={handleSubmit}>
                <div className={styles.fb100}>
                    <Input label="Ticket Title" id="ticketTitle" type="text"></Input>
                </div>
                <div className={styles.fb100}>
                    <Input label="Ticket Description" id="ticketDescription" type="text"></Input>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </main>
        </div>
    )
}

export default Ticket;