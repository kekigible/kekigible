import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
import styles from "../../styles/signup.module.scss";
import illustration from "../../public/images/7023606.jpg"
const Signup = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kekigible|Signup</title>
        <meta
          name="Kekigible"
          content="Blockchain-based eCommerce warranty system using NFTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <section className={styles.formContainer}>
          <h2 className={styles.title}>Sign up</h2>
          <form action="#" className={styles.form}>
            <div className={styles.fb100}>
              <Input type="email" id="email" label="Email*" required={true} />
            </div>
            <div className={styles.fb45}>
              <Input type="text" id="storeName" label="Store Name*" required={true} />
            </div>
            <div className={styles.fb45}>
              <Input type="text" id="phoneNumber" label="Phone Number*" required={true} />
            </div>
            <div className={styles.fb100}>
              <Input type="password" id="password" label="Password*" required={true} />
            </div>

            <input type="submit" name="submit" value="Sign up" onSubmit={() => {}} />
            <Link href="./login">
              <a>Already have an account?</a>
            </Link>
          </form>
          <br />
          <hr />
          <p className={styles.formSeperator}>or</p>
          <div className={styles.walletLink}>
            <Link href="#">
              <p>Connect with a Wallet</p>
            </Link>
          </div>
        </section>
        <section className={styles.middleSpace}></section>
        <section className={styles.rightView}>
          <div className={styles.rightViewTile}>
          <Image src={illustration}  alt="illustration" ></Image>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
