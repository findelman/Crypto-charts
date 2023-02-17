import store from "@/store";
import { GlogalStyle } from "@/styles/GlogalStyle";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Analytics } from '@vercel/analytics/react';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlogalStyle />
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
}
