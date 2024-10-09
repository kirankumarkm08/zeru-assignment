ZERU FINANCE ASSIGNMENT

Overview
zeru finance assignment

Core Features
Feature 1: Implement Web3 wallet connection
Feature 2: Display connected wallet address
Feature 3: Support wallet disconnection

Technologies Used
Frontend: React.js, Next.js, Tailwind CSS,
ethers.js for Ethereum blockchain interactions
Deployment: Vercel

Setup Instructions

Prerequisites
Make sure you have the following installed:
Node.js (v14 or later)
@uniswap/smart-order-router
@uniswap/v3-sdk
ethers
wagmi

Installation

1.clone the repo:
https://github.com/kirankumarkm08/zeru-assignment.git

2.Install Dependencies
npm install

3.Create a .env file in the root directory and add the necessary environment variables:
REACT_APP_TESTNET_URL=https://your_testnet_url
REACT_APP_CHAIN_ID=3 # Ropsten Testnet

4.Start the development server:
npm run dev

Usage:
[Briefly describe how to use the application, e.g., connect a wallet, swap tokens, etc.]

Architecture Overview:
Project Structure
graphql
Copy code
yourproject/
├── public/ # Static files
├── src/
│ ├── components/ # Reusable components
│ ├── services/ # API and contract interaction
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Next.js pages
│ ├── styles/ # CSS/Tailwind styles
│ └── utils/ # Utility functions
├── package.json # Project dependencies and scripts
└── README.md # Project documentation

Core Components:
[Component Name]: [Description of what this component does]
[Service Name]: [Description of the service, e.g., handles contract interactions]
[Hook Name]: [Description of any custom hooks used in the project]

Flow:
User Interaction: Users interact with the frontend to swap tokens.
State Management: The application manages state using [e.g., React hooks, Context API].
Smart Contract Interaction: The application interacts with smart contracts using [e.g., ethers.js].
Network Requests: The app makes requests to the blockchain via [e.g., Infura, Alchemy].

Acknowledgements
Uniswap V3 Smart Contracts - https://docs.uniswap.org/contracts/v3/overview
chatGPT - error explaination,information for unknown command
