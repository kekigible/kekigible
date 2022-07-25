
import Nft from "../ntf/nft";
import styles from "./hero.module.scss"

const Hero = () => {
    return(
        <div className={styles.heroSection}>
            <section className={styles.leftSection}>

            <h1>
                A Place to Manage all your Warranties.
            </h1>
            <p></p>
            </section>
            <section className={styles.rightSection}>
                <Nft></Nft>
            </section>
        </div>
    )
}

export default Hero;