import { useState, useEffect } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const { publicKey } = useWallet();
  const [points, setPoints] = useState(0);

  const fetchPoints = () => {
    if (publicKey) {
      fetch(`/api/getUserPoints?walletAddress=${publicKey.toString()}`)
        .then((response) => response.json())
        .then((data) => setPoints(data.points));
    }
  };

  useEffect(() => {
    fetchPoints(); // Initial fetch
    const interval = setInterval(fetchPoints, 30000); // Fetch every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [publicKey]);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => (window.location.href = "/")}>
        PICASSOL.ART
      </div>
      <div className="links">
        <Link href="https://docs.picassol.art/">
          <a target="_blank">Docs</a>
        </Link>
        <div className="wallet-button">
          Points: {points}
        </div>
        <WalletMultiButton />
      </div>

    </nav>
  );
};

export default Navbar;