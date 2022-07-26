import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

import Navbar from "../components/navbar/navbar"
import styles from "../styles/shopDashboard.module.scss"

let product:products={
    productId:"se87eyt87w3br8gb3",
    productName:"MSI GF63",
    category:"laptop",
    warrantyAvial:true,
    warrantyType:"standard",
    warrantyPeriod:"2 years",
    sold:false,
}
const ShopDashboard = () =>{
    const [listedProducts,setListedProducts] = useState<products[]>([product]);
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
                {(listedProducts.length >0) && 
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Warranty Avial</th>
                            <th>Warranty Type</th>
                            <th>Warranty Period</th>
                            <th>Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listedProducts.map(product=>{
                            return <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.category}</td>
                                <td>{product.warrantyAvial? "Yes":"No" }</td>
                                <td>{product.warrantyType }</td>
                                <td>{product.warrantyPeriod}</td>
                                <td><button>Sold</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>  }
            </section>

        </main>
        </div>
    )
}

export default ShopDashboard;