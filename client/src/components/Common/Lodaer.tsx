import styled, { keyframes } from "styled-components";


const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoaderSpinner = styled.div`
  width: 20%;
  padding-top: 20%;
  border: 10px solid #f3f3f3;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderSpinner />
    </LoaderWrapper>
  );
};