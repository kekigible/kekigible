import Head from "next/head";
import Link from "next/link";

import Input from "../../components/input/input";
import styles from "../../styles/addProduct.module.scss"
const Sell = () =>{
const handleSubmit = (e:any) => {

    const productId = e.value.productIds.value;
    const formBody={
        units: e.target.units.value,
        userId: e.target.userId.value,
        productIds:productId.split(" "),
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
                <Link href="/stores/shopDashboard"><p className={styles.backArrow}>&#8592;</p></Link>
            </div>
        </header>
        <main className={styles.main}>
            <form action="#"
            onSubmit={handleSubmit}>
                <div className={styles.fb45}>
                    <Input id="units" type="number" label="Units"></Input>
                </div>
                <div className={styles.fb45}>
                    <Input id="userId" type="text" label="User Id"></Input>
                </div>
                <div className={styles.fb100}>
                    <Input id="productIds" type="text" label="Product Ids"></Input>
                </div>
                {/* <div className={styles.fb45}>
                    <Input id="password" type="password" label="Password"></Input>
                </div> */}
                <div className={styles.fb100}>
                <input type="submit" value="Sell" />
                </div>
            </form>
        </main>
        </div>
    )
}

export default Sell;