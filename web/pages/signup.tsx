import Head from "next/head";
import Link from "next/link";

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
            <br />
            <hr />
            <p className={styles.formSeperator}>or</p>
            <div className={styles.walletLink}>
              <Link href="#" >
                <p>Connect with a Wallet</p>
              </Link>
            </div>
          </section>
          <section className={styles.middleSpace}></section>
          <section className={styles.rightView}>
            <div className={styles.rightViewTile}>
                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo perspiciatis ab corporis recusandae earum optio dicta impedit dolor eaque in maiores, sit nobis magni eveniet odio nam ratione voluptatibus blanditiis veritatis! Modi adipisci perspiciatis molestias fugiat odit molestiae doloribus assumenda distinctio atque voluptas fuga alias excepturi consequuntur pariatur architecto minus dicta labore sequi at consectetur repellat, recusandae praesentium dolores optio. Eaque necessitatibus dolores fugit cupiditate ipsa tempore suscipit earum alias, odit dicta consequuntur a. Quisquam, a sunt. Minima sequi quidem, expedita adipisci debitis pariatur tempora sapiente quis sint ab ipsa voluptates tempore illo similique perferendis ratione asperiores voluptatem animi autem.</h2>
            </div>
          </section>
        </main>
        
      </div>
    )
}

export default Signup;