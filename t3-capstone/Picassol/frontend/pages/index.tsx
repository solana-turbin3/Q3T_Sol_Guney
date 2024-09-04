import React, { useMemo, useState } from "react";
import ColorSelector from "../components/ColorSelector";
import { Color, colors } from "../lib/colors";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Picassol, IDL } from "../idl/picassol";
import { PublicKey } from "@solana/web3.js";
import Canvas from "../components/Canvas";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);

  const { connection } = useConnection();

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();

  const anchorProvider: AnchorProvider | undefined = useMemo(() => {
    if (anchorWallet) {
      return new AnchorProvider(connection, anchorWallet, {
        commitment: "confirmed",
      });
    } else {
      return undefined;
    }
  }, [connection, anchorWallet]);

  // Make sure you use your program ID!
  const programId = new PublicKey(
    "5rV2CJ8bYV4qEt8qcmhZ1Ty3o6eM7K1LAJDDFipPNyx2"
  );

  const anchorProgram: Program<Picassol> | undefined = useMemo(() => {
    if (anchorProvider) {
      return new Program(IDL, programId, anchorProvider);
    } else {
      return undefined;
    }
  }, [anchorProvider]);

  return (
      <div
        style={{
          width: "100vw",
          maxWidth: "100%",
          background: "transparent",
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="sticky top-0 z-50 ">
            <ColorSelector
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>
          <Canvas program={anchorProgram} selectedColor={selectedColor} />
        </div>
      </div>
  );
}