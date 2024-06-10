import {
    Keypair,
    Connection,
    PublicKey,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';

const PROGRAM_ID = ""; //Paste your Program ID after deploying the Program here

const secret = []; // Paste your secret from id.json of your local solana wallet
const acc = Keypair.fromSecretKey(Uint8Array.from(secret));

const createDataAccount = async (connection: Connection, parentAccount: Keypair) => {
    const dataAccount = Keypair.generate();
    const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: parentAccount.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports: 100000000,
        space: 4,
        programId: new PublicKey(PROGRAM_ID),
    });
    const transaction = new Transaction().add(createAccountInstruction);
    await sendAndConfirmTransaction(connection, transaction, [parentAccount, dataAccount]);
    return dataAccount;
}

const numberToBuffer = (num: number) => {
    const buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(num, 0);
    return buffer;
}

export const callInst = async (parentAccount: Keypair) => {
    const args = process.argv.slice(2);
    const operation = parseInt(args[0]);
    const number1 = parseInt(args[1]);
    const number2 = parseInt(args[2]);

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const dataAccount = await createDataAccount(connection, parentAccount);

    const buffers = [
        Buffer.from(Uint8Array.from([operation])),  // 0 for Addition, 1 for Subtraction
        numberToBuffer(number1),
        numberToBuffer(number2)
    ];
    const data = Buffer.concat(buffers);
    const instruction = new TransactionInstruction({
        keys: [{ pubkey: dataAccount.publicKey, isSigner: false, isWritable: true }],
        programId: new PublicKey(PROGRAM_ID),
        data: data,
    });

    const transactionSignature = await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [parentAccount]
    );

    console.log('Transaction signature:', transactionSignature);

    // Optionally, print the data account public key if needed
    console.log('Data account public key:', dataAccount.publicKey.toBase58());
}

callInst(acc);
