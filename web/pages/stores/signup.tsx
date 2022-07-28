import axios from "axios";
import Head from "next/head";
import Link from "next/link";

import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
import { useAppContext } from "../../context/context";
import styles from "../../styles/signup.module.scss";

const Signup = () => {
  const { setAccessToken, accessToken, isLogedIn } = useAppContext();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formBody = {
      storeName: e.target.storeName.value,
      password: e.target.password.value,
      email: e.target.email.value,
      phonenumber: e.target.phoneNumber.value,
    };

    console.log(formBody);

    try {
      const respose = await axios.post(
        "http://localhost:8000/auth/register/company",
        formBody,
        {
          withCredentials: true,
          // credentials: "include",
        }
      );
      console.log(respose.data);
      setAccessToken(respose.data.token);
    } catch (error) {
      console.log(error);
    }
  };
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
          <form action="#" className={styles.form} onSubmit={handleSubmit}>
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
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo perspiciatis ab
              corporis recusandae earum optio dicta impedit dolor eaque in maiores, sit nobis
              magni eveniet odio nam ratione voluptatibus blanditiis veritatis! Modi adipisci
              perspiciatis molestias fugiat odit molestiae doloribus assumenda distinctio atque
              voluptas fuga alias excepturi consequuntur pariatur architecto minus dicta labore
              sequi at consectetur repellat, recusandae praesentium dolores optio. Eaque
              necessitatibus dolores fugit cupiditate ipsa tempore suscipit earum alias, odit
              dicta consequuntur a. Quisquam, a sunt. Minima sequi quidem, expedita adipisci
              debitis pariatur tempora sapiente quis sint ab ipsa voluptates tempore illo
              similique perferendis ratione asperiores voluptatem animi autem.
            </h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
