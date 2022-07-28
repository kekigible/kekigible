import Head from "next/head";
import Link from "next/link";
import styles from "./navbar.module.scss"
const Navbar = () =>{
    return(
        <div className={styles.navContainer}>
            <nav>
                <ul className={styles.linkContainer} >

                    <li className={styles.link}>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className={styles.link}>
                        <Link href="/stores/signup">
                            <a>Signup Stores</a>
                        </Link>
                    </li>
                    <li className={styles.link}>
                        <Link href="/users/signup">
                            <a>Signup</a>
                        </Link>
                    </li>
                    <li className={styles.link}>
                        <Link href="/users/dashboard">
                            <a>Dashboard</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;