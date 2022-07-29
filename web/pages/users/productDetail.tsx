import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { products, ticket } from "../../data";

const prodt:products={
    owner:"sgDgc",
    productId:"jhdgvs",
    productName: "MSI GF63",
    description:"If this mostly looks like uninteresting JavaScript code, that’s sort of the point. Apart from the annotations we put in place, this TypeScript code looks like JavaScript. The idea is that TypeScript’s type system aims to make it as easy as possible to write typical JavaScript code without bending over backwards to get type safety.",
    category: "Laptop",
    collectionId:"dasjh",
    warrantyAvail: true,
    nftSoulBound:false,
    createdAt:Date(),
    warrantyType: "Standard",
    warrantyPeriod: "2 years",
    nftPurchasable: 23,
    nftImageUrl:"https://images.pexels.com/photos/4051212/pexels-photo-4051212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    productUrl: "https://www.amazon.in/MSI-i5-10500H-Windows-GTX1650-10SC-611IN/dp/B09YTVB91N/ref=sr_1_3?crid=1BBIWE8NE82KP&keywords=msi+gf63&qid=1659013806&sprefix=msi+%2Caps%2C1238&sr=8-3",
}


import styles from "../../styles/productDetail.module.scss"
const ProductDetail = () =>{
    const   [product,setProduct]= useState<products>(prodt);
    const   [tickets, setTickets]=useState<ticket[]>([]);
    const productId = new URLSearchParams(window.location.search).get('productId');
    //search for product id

    
    return(
        <div>
        <Head>
          <title>Kekigible|Add Product</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <div className={styles.header}>
                <Link href="/users/dashboard"><p className={styles.backArrow}>&#8592;</p></Link>
            </div>
        </header>
        <main className={styles.main}>
            <section className={styles.upper}>
                <div className={styles.imgSection}>
                    <img src={product.nftImageUrl} alt={product.productName} width={300} height={300} />
                    <p>{product.productName}</p>
                </div>
                <div className={styles.info}>
                    <p>Owner: {product.owner}</p>
                    <p>Product Name: {product.productName}</p>
                    <p>Description: {product.description}</p>
                    <p>Created At: {product.createdAt}</p>
                    {product.warrantyAvail && <p>Warranty: {product.warrantyType}</p>}
                    {product.warrantyAvail && <p>Warranty Period: {product.warrantyPeriod}</p>}
                    {!product.nftSoulBound && <button className={styles.btn}>Transfer Ownership</button>}
                    <Link href={{pathname:'/users/ticket',query:{productId:product.productId}}}>
                        <p className={styles.btn}>Create a Ticket</p> 
                    </Link>
                </div>
            </section>
            <section className={styles.lower}>
                {tickets.length>0 ? 
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket Id</th>
                                <th>Creation Date</th>
                                <th>Ticket Title</th>
                                <th>Status</th>
                                <th>Last Modified on</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket=>{
                                return <tr key={ticket.ticketIdentifier}>
                                    <td>{ticket.ticketIdentifier}</td>
                                    <td>{ticket.createdAt}</td>
                                    <td>{ticket.ticketTitle}</td>
                                    <td>{ticket.status}</td>
                                    <td>{ticket.modifiedAt}</td>
                                    <td>{ticket.status!=="Ticket Closed"?<button className={styles.btn} onClick={()=>{}}>Close</button>: "Closed"}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>:
                <p>No Tickets Created yet</p>
            }
            </section>
        </main>
        </div>
    )
}

export default ProductDetail;