# Meaning of Life NFT Collection

My first NFT collection, where I write + deploy a smart contract to the ETH blockchain, and build a Web3 client app to interact with my contract.

The Meaning of Life NFT Collection aims to create uniqe and personalised answers to the question: What is the meaning of life, the universe and everything else? 

The NFT collection is limited to 42 NFTs.

[Click here](https://meaning-of-life-nft-collection.herokuapp.com/) to get your answer NOW.

Note: You will need a Meta Mask wallet and be connected to Rinkeby test network.

## Version 1.0 (release December 2021)

- Minting your own NFT
- Access to the the Meaning of Life NFT Collection
- Meta Mask support
- Rinkeby test network support

## Local setup

```
git clone https://github.com/avocadohooman/meaning-of-life-nfts.git
cd meaning-of-life-nfts
yarn install
cd client
yarn install
```

### Run local client

```
cd client
yarn run start
```

### Hardhat/Smart contract test

`
npx hardhat run scripts/run.js
`

### Run local blockhain enviroment

Establish local blockhain and keep it running:

`
npx hardhat node
`

Deploy smart contract on local network

`
npx hardhat run scripts/deploy.js --network localhost
`

## App Preview 

### Main page
![landing](./README_assets/nft_collection.png?raw=true)
### Minting your NFT
![minting_nft](./README_assets/minting_nft_collection.gif?raw=true)

