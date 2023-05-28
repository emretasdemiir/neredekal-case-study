import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Link from 'next/link'
import { Box, Container } from '@mui/material';

const IndexPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Neredekal Case Study</title>
        <link href="https://fonts.cdnfonts.com/css/pokemon-solid?styles=24573" rel="stylesheet" />
      </Head>
      <Box className={styles.container}>
        {/* <img src='https://wallpapers.com/images/featured/va6139eg5csznzmw.jpg' width={600} height={400} /> */}
        <Box className={styles.textContainer}>
          <h1 className={styles.textStyle}>
            Welcome to my pokémon app
          </h1>
          <h2>
            <span className={styles.textStyle}>Go To </span>
            <Link href='/pokemon-list' className={styles.linkStyle}>Pokédex</Link>
          </h2>
        </Box>
      </Box>
    </>
  )
}

export default IndexPage
