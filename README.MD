# Ethdrop 
### Share files anonymously 👻 with the help of Blockchain and IPFS.

#### Features :

- Ethereum Login 😈
- Decentralized Storage (IPFS) 🗂
- Encryption 🔐

#### Project Structure :

```
ethdrop/
  packages/
    client/
    server/
    truffle/
```

The **client** folder contains react code.
The **truffle** folder inside the client folder contains the smart contract code for Ethdrop.
The **server** folder contains express.js server code.

## Setting up the project

 1. Add a **.env** file in server folder, with the following fields
> MONGODB_URI=<DB_URI> <br/>
> ENCRYPTION_KEY=<RANDOM_32_CHARS>

 2. Add a **.env** file in truffle folder, with the following fields
> MNEMONIC=<METAMASK_ACCOUNT_SECRET_PHRASE> <br/>
> INFURA_ENDPOINT=<INFURA_ENDPOINT_FOR_RINKEBY>

 3. Run `yarn install` 💁🏻‍♂️
 4. Followed by `yarn build` 🧑🏻‍💻
 5. Then run `yarn start` 🚀
 6. Once the app starts, navigate to `localhost:9900` 👀
 7. That's it 🎉

