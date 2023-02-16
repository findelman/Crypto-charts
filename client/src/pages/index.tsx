import { Container } from "@/components/Containers";
import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Wrapper>
        <Container />
      </Wrapper>
    </>
  );
}
