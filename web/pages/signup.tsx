import Head from "next/head";

import Input from "../components/input/input";
import Navbar from "../components/navbar/navbar";
import styles from "../styles/signup.module.scss"

const Signup = () =>{
    return(
        <div className={styles.container}>
        <Head>
          <title>Signup</title>
          <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <Navbar />
        </header>
        <main className={styles.main}>
          <section className={styles.formContainer}>
            <h2 className={styles.title}>Sign up</h2>
            <form action="#" className={styles.form}>
                <div className={styles.email}>
                    <Input type="email" id="email" label="Email*"/>
                </div>
                <div className={styles.firstname}>
                    <Input type="text" id="firstname" label="First Name*" />
                </div>
                <div className={styles.lastname}>
                    <Input type="text" id="lastname" label="Last Name*" />
                </div>
                <div className={styles.password}>
                    <Input type="password" id="password" label="Password*" />
                </div>

                <input type="submit" name="submit" value="Sign up" onSubmit={()=>{}} />
            </form>
            
          </section>
          <section className={styles.rightView}>
            <div className={styles.rightViewTile}>
                <h2>Add Someting</h2>
            </div>
          </section>
        </main>
        
      </div>
    )
}

export default Signup;