import '@/styles/globals.css'
import '@/styles/main_menu.css'
import "@/styles/chat.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
