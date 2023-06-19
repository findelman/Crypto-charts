import { fetcher } from "@/api/fetcher";
import { ChartWrapper } from "@/components/Chart/ChartWrapper";
import useSWR from 'swr';
import { CryptoList } from "@/components/PopularList/CryptoList";
import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div``;



export default function Home({cryptoList}: any) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Wrapper>
        <ChartWrapper />
        <CryptoList cryptoList={cryptoList}/>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await useSWR('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1', fetcher);
    const cryptoList = response.data;
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