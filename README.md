# Rust Calculator Program

This project is about creating a simple calculator program written in rust that performs addition and subtraction of two digits, entered by the user.

## Description

The frontend takes three arguments - Instruction index(0 -> Addition, 1 -> Subtraction), Number 1 and Number 2. Converts the data into a U8Array and is passed as data in the instruction. The program calculates the result and stores it in a program account, returning the transaction signature which can be used to verify the authenticity of the calculator.
## Getting Started

### Setting up the project

After using git clone, run the command

```javascript
npm install
```
To install the necessary dependencies required for the front end.

### Build and Deploy the Program

Copy the code in the lib.rs file and head over to https://beta.solpg.io/ . Create a New Solana project and paste the code there. Build and Deploy the program and get the Program ID. Paste the Program ID in the calc.ts file.
```typescript
const PROGRAM_ID = ""; //Paste your Program ID after deploying the Program here

```

### Final setup

Also make sure to copy the secret array present in id.json in your local solana wallet folder and paste it in the calc.ts file.
```typescript
const secret = []; //Paste your secret from id.json

```

### How to Interact

Once everything is done setting up, use the command `npm run start` along with 3 other arguments, where the first argument being the type of calculation(0 -> Addition, 1-> Subtraction). for eg.

```typescript
npm run start 0 1 3
```
For addition, &

```typescript
npm run start 1 3 1
```
For subtraction.

### Correctness

In the end you'll recieve a Tx signature, Which you can go ahead and paste it in the Solana Explorer to verify the logs. Happy Coding!

## Authors

Siddhant Khare
