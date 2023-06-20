import { ChartWrapper } from "@/components/Chart/ChartWrapper";
import { CryptoTable } from "@/components/CryptoTable";
import { CryptoList } from "@/components/PopularList/CryptoList";
import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function Home({ cryptoList }: any) {
  console.log(cryptoList);
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Wrapper>
        <ChartWrapper />
        <CryptoList cryptoList={cryptoList} />
        <CryptoTable cryptoList={cryptoList} />
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
    );
    const cryptoList = await response.json();
    return {
      props: {
        cryptoList,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        cryptoList: null,
      },
    };
  }
}
