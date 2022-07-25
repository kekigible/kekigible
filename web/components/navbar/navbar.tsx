import Head from "next/head";
import Link from "next/link";
import styles from "./navbar.module.scss"
const Navbar = () =>{
    return(
        <div className={styles.navContainer}>
            <nav>
                <ul className={styles.linkContainer} >

                    <li className={styles.link}>
                        <Link href="./">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className={styles.link}>
                        <Link href="./login">
                            <a>Login</a>
                        </Link>
                    </li>
                    <li className={styles.link}>
                        <Link href="./signup">
                            <a>Signup</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;