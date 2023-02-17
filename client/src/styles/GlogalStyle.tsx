import { createGlobalStyle } from "styled-components";

export const GlogalStyle = createGlobalStyle`
* {
  padding: 0;
  font-family: monospace;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  outline: none;
  border: unset;
}

button {
  cursor: pointer;
}
`;
