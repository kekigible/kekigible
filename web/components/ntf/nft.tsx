
import Image from 'next/image';
import styles from './nft.module.scss';

const defaultProp: products = {
    productName:"Product Name",
    warrantyType:"Standard",
    purchaseDate:"DD/MM/YYYY",
    productId:"###############",
    sold:true,
    warrantyAvial:false,
    category:"---"
}

const Nft = (product:products) =>{
    return(
        <div className={styles.nftContainer}>
            <section className={styles.upperHalf}>
                <div className={styles.imageContainer}>
                    <Image src="/web/public/vercel.svg" alt="product.img" height='100px' width='100px'></Image>
                </div>
                <section className={styles.productDetail}>
                <p>{product.productName}</p>
                <p className={styles.fade}>Product ID: {product.productId}</p>
                </section>
            </section>
            <section className={styles.lowerHalf}>
                <p>Purchase Date: {product.purchaseDate}</p>
                <p>Warrranty Type: {product.warrantyType}</p>
            </section>
        </div>
    )
}

Nft.defaultProps= defaultProp;

export default Nft;