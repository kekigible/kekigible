import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import noData from "../../public/images/2953962.jpg"
import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
import styles from "../../styles/Dashboard.module.scss";
import { products } from "../../data";
import axios from "axios";
import { useAppContext } from "../../context/context";

const product: products = {
  productId: "jhdgvs",
  productName: "MSI GF63",
  category: "Laptop",
  collectionId: "dasjh",
  description: "Lorem",
  warrantyAvail: true,
  nftSoulBound: true,
  createdAt: Date(),
  warrantyType: "Standard",
  warrantyPeriod: "2 years",
  nftPurchasable: 23,
  nftImageUrl:
    "https://images.pexels.com/photos/4051212/pexels-photo-4051212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  productUrl:
    "https://www.amazon.in/MSI-i5-10500H-Windows-GTX1650-10SC-611IN/dp/B09YTVB91N/ref=sr_1_3?crid=1BBIWE8NE82KP&keywords=msi+gf63&qid=1659013806&sprefix=msi+%2Caps%2C1238&sr=8-3",
};

const Dashboard = () => {
  const { accessToken } = useAppContext();
  const [ownedProducts, setOwnedProducts] = useState<products[]>([]);

  const getProducts = async () => {
    // console.log(accessToken);
    try {
      const response = await axios.get("http://localhost:8000/product", {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log("products ", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      console.log("if loop", accessToken);
      getProducts();
    }
  }, [accessToken]);
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
                <Link href="/market">
                    <p className={styles.btn}>Market</p>  
                </Link>
            <form action="#" className={styles.form}>
                <Input id='search' type="text" label="Search for a product"></Input>
                <input type="submit" value="Go" />
            </form>
            </section>
            <section className={styles.product}>
                <div className={styles.nftSection}>
            {ownedProducts.length>0 ? ownedProducts.map((product) => {
              return (
                <Link
                  href={{
                    pathname: "/users/productDetail",
                    query: { productId: product.productId },
                  }}
                  key={product.productId}
                  className={styles.nftContainer}
                >
                  <div className={styles.nft}>
                    <img
                      src={product.nftImageUrl}
                      alt={product.productName}
                      width={200}
                      height={200}
                    ></img>
                    <p className={styles.title}>{product.productName}</p>
                    <p>{product.description}</p>
                  </div>
                </Link>
              );
            }):
            <Image src={noData} alt="no Data" height={1800} ></Image>
            }
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
