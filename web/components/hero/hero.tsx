import Link from "next/link";

import Nft from "../ntf/nft";
import styles from "./hero.module.scss"

const Hero = () => {
    return(
        <div className={styles.heroSection}>
            <section className={styles.leftSection}>

            <h1>
                A place to manage all your warranties.
            </h1>
            <p>About time you go paperless and manage all your warranties in a more secure way</p>
            <section className={styles.linkHolder}>
                <Link  href='./users/login'>
                    <p>Dashbord</p>
                </Link>
                <Link  href='./stores/login'>
                    <p>Dashbord for Shops</p>
                </Link>
            </section>
            </section>
            <section className={styles.rightSection}>
                <Nft 
                productName="Product Name"
                warrantyType="Standard"
                purchaseDate="DD/MM/YYYY"
                productId="###############"
                sold={true}
                warrantyAvial={false}
                category="---"
                />
            </section>
        </div>
    )
}

export default Hero;