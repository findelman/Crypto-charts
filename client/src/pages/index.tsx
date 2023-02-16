import Head from "next/head";
import styled from "styled-components";
import { Container } from "./Container";

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
