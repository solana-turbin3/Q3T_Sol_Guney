import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { T3Escrow } from "../target/types/t3_escrow";

describe("t3-escrow", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.T3Escrow as Program<T3Escrow>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
