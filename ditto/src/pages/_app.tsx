import "@/styles/globals.css";
import "@/styles/chat.scss";
import "@/styles/settings.scss";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
