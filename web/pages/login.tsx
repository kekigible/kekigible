import Head from "next/head";
import Link from "next/link";

import Input from "../components/input/input";
import Navbar from "../components/navbar/navbar";
import styles from "../styles/login.module.scss"

const  Login = () => {
    return(
        <div className={styles.container}>
        <Head>
          <title>Kekigible|Login</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <Navbar />
        </header>
        <main className={styles.main}>
            <section className={styles.formContainer}>
                <h2 className={styles.title}>Log in</h2>
                <form action="#" className={styles.form}>
                <div className={styles.email}>
                    <Input type="email" id="email" label="Email*" required={true}/>
                </div>
                <div className={styles.password}>
                    <Input type="password" id="password" label="Password*" required={true}/>
                </div>
                <input type="submit" name="submit" value="Log in" onSubmit={()=>{}} />
                <Link href="./signup"><a>Don't have an account?</a></Link>
                </form>
                <br />
            <hr />
            <p className={styles.formSeperator}>or</p>
            <div className={styles.walletLink}>
              <Link href="#" >
                <p>Connect with a Wallet</p>
              </Link>
            </div>
            </section>
        </main>
        </div>
    )
}

export default Login;