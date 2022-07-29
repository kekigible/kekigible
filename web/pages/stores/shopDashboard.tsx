import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

import Navbar from "../../components/navbar/navbar"
import { collections } from "../../data"
import styles from "../../styles/shopDashboard.module.scss"

let collection:collections={
    name: "MSI GF63",
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
const ShopDashboard = () =>{
    const [listedCollection,setlistedCollection] = useState<collections[]>([collection]);
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
            <section className={styles.top}>
            {/* <Link href="./addProduct"><p className={styles.addProdbtn}>+ Add a Product</p></Link> */}
            <Link href="./addProduct"><p className={styles.addProdbtn}>+ Add a Collection</p></Link>
            </section>
            <section    className={styles.product}>
                
                {(listedCollection.length >0) && 
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Collection Name</th>
                            <th>Category</th>
                            <th>Warranty Avail</th>
                            <th>Warranty Type</th>
                            <th>Warranty Period</th>
                            <th>Remaining Amount</th>
                            <th>Product url</th>
                            <th>Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listedCollection.map((collection,index)=>{
                            return <tr key={index}>
                                <td>{collection.name}</td>
                                <td>{collection.category}</td>
                                <td>{collection.warrantyAvail? "Yes":"No" }</td>
                                <td>{collection.warrantyType }</td>
                                <td>{collection.warrantyPeriod}</td>
                                <td>{collection.nftPurchasable}</td>
                                <th><Link href={collection.productUrl} target="_blank">Link</Link></th>
                                <td><Link href="/stores/sell"><p className={styles.addProdbtn}>Sell</p></Link></td>
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