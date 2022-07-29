import Head from "next/head";
import Link from "next/link";

import Input from "../../components/input/input";
import styles  from "../../styles/addProduct.module.scss"

const Ticket = () =>{
    const productId = new URLSearchParams(window.location.search).get('productId');

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
            <form action="#">
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