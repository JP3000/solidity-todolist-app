# Todo DApp with Solidity, Next.js & Truffle

![DApp Preview](public/screenshot.png)

A beginner-friendly decentralized todo application built for the Sepolia testnet. Perfect introduction to Web3 development with full blockchain integration.

## Features

- ✅ Add, get all tasks, and delete tasks on blockchain (testnet)
- 🔒 MetaMask wallet authentication
- 🌐 Sepolia testnet deployment ready
- 📱 Next.js frontend

## Tech Stack

**Core**  
Solidity · Next.js · Truffle · ethers  

**Infrastructure**  
Sepolia Testnet · Truffle · MetaMask  

## Quick Start

1. Clone repo and install dependencies:
```bash
https://github.com/JP3000/solidity-todolist-app.git
cd solidity-todolist-app
cd client 
npm install
```

2. Start the frond-end:
```bash
    yarn dev
```

3. Open the app in your browser:
```bash
http://localhost:3000
```

4. Connect your MetaMask wallet to the Sepolia testnet and deploy the smart contract.

## Deploying to Sepolia Testnet

1. Install Truffle:
```bash
npm install -g truffle
```

2. Compile the smart contract:
```bash
    truffle dashboard
```
3. Deploy the smart contract to Sepolia testnet:
```bash
    truffle migrate --network
```
be careful with the network name, it should be `sepolia`.

3. Deploy the smart contract to Sepolia testnet by truffle dashboard.

## Acknowledgments

Thanks to all the amazing tools and developers who contributed to this project.

- **Project Inspiration:** [Build a Todo App with Solidity, Next.js & Truffle](https://www.youtube.com/watch?v=awQTDVvYyjI) by Clever Programmer
