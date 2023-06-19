import { fetcher } from "@/api/fetcher";
import { ChartWrapper } from "@/components/Chart/ChartWrapper";
import useSWR from "swr";
import { CryptoList } from "@/components/PopularList/CryptoList";
import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function Home({ cryptoList }: any) {
  const testCryptoList = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      current_price: 50000,
      market_cap: 100000000,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      current_price: 3000,
      market_cap: 50000000,
    },
  ];
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Wrapper>
        <ChartWrapper />
        <CryptoList cryptoList={cryptoList} />
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1");
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
