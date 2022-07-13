import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Navbar from '../components/navbar/navbar'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kekigible</title>
        <meta name="Kekigible" content="Blockchain-based eCommerce warranty system using NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header>
          <Navbar></Navbar>
        </header>
      </main>
      
    </div>
  )
}

export default Home
