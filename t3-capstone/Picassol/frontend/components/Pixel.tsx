import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Picassol } from "../idl/picassol";
import { Color } from "../lib/colors";

type PixelAccount = IdlAccounts<Picassol>["pixel"];

interface Props {
posX: number;
posY: number;
program: Program<Picassol>;
pixelData?: PixelAccount;
selectedColor: Color;
}

export default function Pixel({
posX,
posY,
program,
pixelData,
selectedColor,
}: Props) {
const { colR, colG, colB } = pixelData || {};
const color = pixelData ? `rgb(${colR}, ${colG}, ${colB})` : "white";

const getPixelAddress = () => {
const [pixelPublicKey] = PublicKey.findProgramAddressSync(
[Buffer.from("pixel"), Buffer.from([posX, posY])],
program.programId
);
return pixelPublicKey;
};

const createPixel = async () => {
const lastClickTime = localStorage.getItem("lastClickTime");
const now = Date.now();

if (lastClickTime && now - Number(lastClickTime) < 33000) {
return;
}

await program.methods
.createPixel(
posX,
posY,
selectedColor.r,
selectedColor.g,
selectedColor.b
)
.accounts({
pixel: getPixelAddress(),
user: program.provider.publicKey,
systemProgram: SystemProgram.programId,
})
.rpc();

// Set the lastClickTime after the transaction is successful
localStorage.setItem("lastClickTime", String(now));

// Update user points
fetch('/api/updateUserPoints', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
walletAddress: program.provider.publicKey.toString(),
}),
});
};

const updatePixel = async () => {
const lastClickTime = localStorage.getItem("lastClickTime");
const now = Date.now();

if (lastClickTime && now - Number(lastClickTime) < 33000) {
return;
}

const transaction = new Transaction();

try {
// Add the updatePixel instruction
transaction.add(
await program.methods
.updatePixel(selectedColor.r, selectedColor.g, selectedColor.b)
.accounts({
pixel: getPixelAddress(),
})
.instruction()
);

// Add the SOL fee transfer instruction
const feeRecipient = new PublicKey(process.env.NEXT_PUBLIC_FEE_RECIPIENT_ADDRESS);
const feeAmountSol = parseFloat(process.env.NEXT_PUBLIC_FEE_AMOUNT_SOL || "0");
const lamports = feeAmountSol * LAMPORTS_PER_SOL;

transaction.add(
SystemProgram.transfer({
fromPubkey: program.provider.publicKey,
toPubkey: feeRecipient,
lamports: lamports,
})
);

await program.provider.sendAndConfirm(transaction);

// Set the lastClickTime after the transaction is successful
localStorage.setItem("lastClickTime", String(now));

// Update user points
fetch('/api/updateUserPoints', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
walletAddress: program.provider.publicKey.toString(),
}),
});
} catch (error) {
console.error("Transaction failed:", error);
if (error.logs) {
console.error("Transaction logs:", error.logs);
}
}
};

const handleMouseEnter = () => {
// Change the color of the pixel to the selected color on hover
const pixelElement = document.getElementById(`pixel-${posX}-${posY}`);
if (pixelElement) {
pixelElement.style.backgroundColor = `rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`;
pixelElement.classList.add('pixel-hover');
}
};

const handleMouseLeave = () => {
// Reset the color of the pixel to its original color on mouse leave
const pixelElement = document.getElementById(`pixel-${posX}-${posY}`);
if (pixelElement) {
pixelElement.style.backgroundColor = color;
pixelElement.classList.remove('pixel-hover');
}
};

return (
<td
id={`pixel-${posX}-${posY}`}
className="h-3.5 min-w-[0.875rem]"
style={{ backgroundColor: color }}
onClick={pixelData ? updatePixel : createPixel}
onMouseEnter={handleMouseEnter}
onMouseLeave={handleMouseLeave}
/>
);
}
