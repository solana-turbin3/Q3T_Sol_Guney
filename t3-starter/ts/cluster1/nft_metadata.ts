import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const metadata = {
            name: "Turbin3-Rug",
            symbol: "TRUG",
            description: "A very unique speacial very beatiful rug",
            image: "https://arweave.net/gqp8pR3VhI04HgP0l7gnkoM8hvCzGqEKXfRr6fkRwSg",
            attributes: [
                {trait_type: 'background', value: 'white'},
                {trait_type: 'side', value: 'blue'},
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://arweave.net/gqp8pR3VhI04HgP0l7gnkoM8hvCzGqEKXfRr6fkRwSg"
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
