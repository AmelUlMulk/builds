import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../layouts/NavBar';
import CustomAppolo from '../utils/connections/AppoloClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />;
    </>
  );
}
