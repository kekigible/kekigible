
import Image from 'next/image';
import styles from './nft.module.scss';

const defaultProp: nftProp = {
    productName:"Product Name",
    purchaseDate:"DD/MM/YYYY",
    warrantyType:"Standard",
    productId:"###############"
}

const Nft = ({productName, purchaseDate,warrantyType, productId}:nftProp) =>{
    return(
        <div className={styles.nftContainer}>
            <section className={styles.upperHalf}>
                <div className={styles.imageContainer}>
                    <Image src="/web/public/vercel.svg" alt="product.img" height='100px' width='100px'></Image>
                </div>
                <section className={styles.productDetail}>
                <p>{productName}</p>
                <p className={styles.fade}>Product ID: {productId}</p>
                </section>
            </section>
            <section className={styles.lowerHalf}>
                <p>Purchase Date: {purchaseDate}</p>
                <p>Warrranty Type: {warrantyType}</p>
            </section>
        </div>
    )
}

Nft.defaultProps= defaultProp;

export default Nft;