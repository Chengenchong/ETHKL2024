require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID; // Add this line

module.exports = {
  solidity: "0.8.20",
  networks: {
    manta: {
      url: "https://pacific-rpc.manta.network/http",
      accounts: [PRIVATE_KEY],
      chainId: 169,
    },
    mantaTestnet: {
      url: "https://pacific-rpc.testnet.manta.network/http",
      accounts: [PRIVATE_KEY],
      chainId: 3441005,
    },
    sepolia: {  // Add this new section
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};