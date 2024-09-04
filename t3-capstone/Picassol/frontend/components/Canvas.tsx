import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";
import { Picassol } from "../idl/picassol";
import { Color } from "../lib/colors";
import Pixel from "./Pixel";

interface Props {
  program?: Program<Picassol>;
  selectedColor: Color;
}

type PixelAccount = IdlAccounts<Picassol>["pixel"];

interface PixelChangedEvent {
  posX: number;
  posY: number;
  colR: number;
  colG: number;
  colB: number;
}

export default function Canvas({ program, selectedColor }: Props) {
  const disabled = !program;
  const [fetchedPixels, setFetchedPixels] = useState<PixelAccount[]>([]);

  const fetchPixels = async () => {
    if (program) {
      const pixels = await program.account.pixel.all();
      console.log("got the pixels!", pixels);
      setFetchedPixels(pixels.map((p) => p.account));
    }
  };

  useEffect(() => {
    fetchPixels();
  }, [program]);

  const pixelsMap = useMemo(() => {
    const map: { [id: number]: PixelAccount } = {};
    fetchedPixels.forEach((p) => {
      const id = p.posY * 200 + p.posX;
      map[id] = p;
    });
    return map;
  }, [fetchedPixels]);

  const getPixelAddress = (posX: number, posY: number) => {
    const [pixelPublicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([posX, posY])],
      program.programId
    );
    return pixelPublicKey;
  };

  useEffect(() => {
    if (!program) return;

    const listener = program.addEventListener(
      "PixelChanged",
      async (event, _slot, _sig) => {
        const e = event as PixelChangedEvent;

        const pixelAddress = await getPixelAddress(e.posX, e.posY);
        const updatedPixelAccount = await program.account.pixel.fetch(
          pixelAddress
        );

        setFetchedPixels((pixels) => {
          const newPixels = [...pixels];
          const index = newPixels.findIndex(
            (p) => p.posX === e.posX && p.posY === e.posY
          );
          if (index >= 0) {
            newPixels[index] = updatedPixelAccount;
          } else {
            newPixels.push(updatedPixelAccount);
          }
          return newPixels;
        });
      }
    );

    return () => {
      program.removeEventListener(listener);
    };
  }, [program]);

  return (
    <div className="container">
      <div
        className={clsx("canvas-wrapper", disabled && "opacity-25 cursor-not-allowed")}
      >
        <table className="table-fixed">
          <tbody>
            {[...Array(200)].map((_, y) => (
              <tr key={y}>
                {[...Array(200)].map((_, x) => {
                  const id = y * 200 + x;
                  const pixelData = pixelsMap[id];

                  return (
                    <Pixel
                      posX={x}
                      posY={y}
                      program={program}
                      pixelData={pixelData}
                      selectedColor={selectedColor}
                      key={`${y}-${x}`}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
