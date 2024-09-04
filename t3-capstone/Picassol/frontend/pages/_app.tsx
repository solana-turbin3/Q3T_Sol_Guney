import '../styles/index.css'
import '../styles/TermsOfService.css';
import '../styles/styles.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import '../styles/rainbow-text.css'
import Navbar from '../components/Navbar'; // replace with the actual path to Navbar
import Footer from '../components/Footer'; // replace with the actual path to Footer
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack'
import { useRouter } from 'next/router'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }: AppProps) {
  // Use custom RPC URL from environment variable or fallback to devnet
  const endpoint = 'https://api.devnet.solana.com';
  
  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = [
    new PhantomWalletAdapter(),
    new BackpackWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  const router = useRouter();
  const isExcludedRoute = ['/privacy-policy', '/terms-of-use'].includes(router.pathname);

  return (
    <div style={{ background: 'linear-gradient(to bottom, #000000, #434343, #000000)', minHeight: '100vh' }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={!isExcludedRoute}>
          <WalletModalProvider>
            <Head>
              <title>Picassol</title>
            </Head>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default MyApp
