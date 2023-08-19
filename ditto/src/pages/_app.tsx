import "@/styles/globals.css";
import "@/styles/main_menu.css";
import "@/styles/chat.scss";
import "@/styles/card.scss";
import "@/styles/chatItem.scss";
import type { AppProps } from "next/app";
import 'regenerator-runtime/runtime'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
