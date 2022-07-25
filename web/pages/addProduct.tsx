import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/addProduct.module.scss"
import Input from "../components/input/input";
const AddProduct = () =>{
    const [isWarranty,setIsWarranty] = useState(false);
    return (
        <div>
        <Head>
          <title>Kekigible|Add Product</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <div className={styles.header}>
                <Link href="./shopDashboard"><p className={styles.backArrow}>&#8592;</p></Link>
            </div>
        </header>
        <main className={styles.main}>
            <form action="#">
                <div className={styles.fb100}>
                <Input id="productName" label="Product Name" type="text"></Input>
                </div>
                <div className={styles.fb45}>
                <Input id="productId" label="Product ID" type="text"></Input>
                </div>
                <div className={styles.fb45}>
                <Input id="purchaseDate" label="Purchase Date" type="Date"></Input>
                </div>
                <div className={styles.fb100}>
                <Input id="productImage" label="Product Image" type="file"></Input>
                </div>
                <div className={styles.fb100}>
                <label htmlFor="isWarrentied" className={styles.fslabel}>Does the product conatins a Warranty? </label>
                <input type="checkbox" name="isWarrantied" id="isWarrentied" className={styles.warrantyCb} onChange={()=>setIsWarranty(!isWarranty)}/>
                </div>
                {
                    isWarranty && (
                        <>
                            <div className={styles.fb100}>
                            <label htmlFor="warrantyType" className={styles.fslabel}>Choose a Warranty Type: </label>
                            <select name="warrantyType" id="warrantyType" className={styles.select}>
                                <option value="standard">Standard</option>
                                <option value="extended">Extended</option>
                                <option value="lifetime">Life Time</option>
                                <option value="other">other</option>
                            </select>
                            </div>
                            <div className={styles.fb45}>
                                <Input type="number" id="timePeriod" label="Time Period"></Input>
                            </div>
                            <div className={styles.fb45}>
                                <select name="timeperiodunit" id="timePeriodUnit" className={styles.select}>
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </select>
                            </div>
                        </>
                    )
                }

            </form>
        </main>
        </div>
    )
}

export default AddProduct;